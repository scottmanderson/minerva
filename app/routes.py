from app import app, db
from app.models import (
    FinancialObject,
    FinancialObjectSchema,
    TSData,
    TSDataSchema,
    DataSource,
    DataSourceSchema,
    DataSourcePoll,
    DataSourcePollSchema,
    Settings,
    SettingsSchema,
)
from app.quant import TSCalc, TSCalcSchema
from config import basedir
from shared_functions import fetch_all_data_sources
import flask
import json
import os

financial_object_schema = FinancialObjectSchema()
financial_objects_schema = FinancialObjectSchema(many=True)
ts_datum_schema = TSDataSchema()
ts_data_schema = TSDataSchema(many=True)
ts_calc_schema = TSCalcSchema()
data_source_schema = DataSourceSchema()
data_sources_schema = DataSourceSchema(many=True)
data_source_poll_schema = DataSourcePollSchema()
data_source_polls_schema = DataSourcePollSchema(many=True)
setting_schema = SettingsSchema()
settings_schema = SettingsSchema(many=True)

all_data_sources = fetch_all_data_sources()
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}


# Serve React App
@app.route("/", methods=["GET"])
def serve_react_app():
    if os.path.exists(app.static_folder + "/index.html"):
        return flask.send_from_directory(app.static_folder, "index.html")
    else:
        return f"No Valid App To Serve; expected a react index.html file at {app.static_folder}"


@app.route("/<path:path>")
def static_proxy(path):
    """static folder serve"""
    file_name = path.split("/")[-1]
    dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
    return flask.send_from_directory(dir_name, file_name)


# Basic Object Manipulation Routes
@app.route("/fo", methods=["POST"])
def add_financial_object():
    name = flask.request.json["name"]
    report_name = flask.request.json["report_name"]
    ticker = flask.request.json["ticker"]

    new_fo = FinancialObject(name=name, report_name=report_name, ticker=ticker)

    db.session.add(new_fo)
    db.session.commit()
    return financial_object_schema.jsonify(new_fo)


@app.route("/fo", methods=["GET"])
def get_all_fo():
    all_fo = FinancialObject.query.all()
    result = financial_objects_schema.dump(all_fo)
    if result[1] == {}:  # result[1] is error group, adds layers to json if not removed
        result = result[0]
    result.sort(key=lambda x: x["report_name"])
    return flask.jsonify(result)


@app.route("/fo/<foid>", methods=["GET"])
def get_fo(foid):
    fo = FinancialObject.query.get(foid)
    return financial_object_schema.jsonify(fo)


@app.route("/fo/<foid>", methods=["PUT"])
def update_fo(foid):
    fo = FinancialObject.query.get(foid)

    name = flask.request.json["name"]
    report_name = flask.request.json["report_name"]
    ticker = flask.request.json["ticker"]

    fo.name = name
    fo.report_name = report_name
    fo.ticker = ticker

    db.session.commit()

    return financial_object_schema.jsonify(fo)


@app.route("/fo/<foid>", methods=["DELETE"])
def delete_financial_object(foid):
    fo = FinancialObject.query.get(foid)
    db.session.delete(fo)
    db.session.commit()

    return financial_object_schema.jsonify(fo)


# Time Series Manipulation Routes (pure TS, without calculation)
@app.route("/tsi", methods=["POST"])
def add_tsi():
    foid = flask.request.json["foid"]
    dt = flask.request.json["dt"]
    level = flask.request.json["level"]
    source = flask.request.json["source"]

    new_tsi = TSData(foid=foid, dt=dt, level=level, source=source)

    db.session.add(new_tsi)
    db.session.commit()

    return ts_datum_schema.jsonify(new_tsi)


@app.route("/ts_level/<foid>", methods=["GET"])
def get_ts_level(foid):
    TSCalc.compute_ts_level(foid)


@app.route("/ts_returns/<foid>", methods=["GET"])
def get_ts_returns(foid):
    all_ts = TSData.query.filter(TSData.foid == foid)
    return ts_data_schema.jsonify(all_ts)


@app.route("/tsi/<tsid>", methods=["GET"])
def get_tsi(tsid):
    tsi = TSData.query.get(tsid)
    return ts_datum_schema.jsonify(tsi)


@app.route("/tsi/<tsid>", methods=["PUT"])
def update_tsi(tsid):
    tsi = TSData.query.get(tsid)

    foid = flask.request.json["foid"]
    dt = flask.request.json["dt"]
    level = flask.request.json["level"]
    source = flask.request.json["source"]

    tsi.foid = foid
    tsi.dt = dt
    tsi.level = level
    tsi.source = source

    db.session.commit()
    return ts_datum_schema.jsonify(tsi)


@app.route("/tsi/<tsid>", methods=["DELETE"])
def delete_tsi(tsid):
    tsi = TSData.query.get(tsid)
    db.session.delete(tsi)
    db.session.commit()

    return financial_object_schema.jsonify(tsi)


# Stat Routes
@app.route("/stat/<foid>", methods=["GET"])
def get_returns_statistics(foid):
    freq_code = flask.request.args.get("freq_code") or "M"
    start = flask.request.args.get("start")
    end = flask.request.args.get("end")
    benchmark_foid = flask.request.args.get("benchmark_foid")

    calc = TSCalc(
        foid=foid,
        freq_code=freq_code,
        start=start,
        end=end,
        benchmark_foid=benchmark_foid,
    )
    payload = ts_calc_schema.dump(calc)
    # if payload[1] == {}:  # result[1] is error group, adds layers to json if not removed
    #    payload = payload[0]
    return flask.jsonify(payload)


# Data Source Management
@app.route("/sources", methods=["GET"])
def get_data_sources():
    all_ds = fetch_all_data_sources()
    result = data_sources_schema.dump(all_ds)
    if result[1] == {}:  # result[1] is error group, adds layers to json if not removed
        result = result[0]
    return flask.jsonify(result)


@app.route("/sources", methods=["POST"])
def add_data_source():
    name = flask.request.json["name"]
    hierarchy_rank = flask.request.json["hierarchy_rank"]
    api_key = flask.request.json["api_key"] or ""

    new_ds = DataSource(name=name, hierarchy_rank=hierarchy_rank, api_key=api_key)

    db.session.add(new_ds)
    db.session.commit()
    return data_source_schema.jsonify(new_ds)


@app.route("/sources/<dsid>", methods=["PUT"])
def update_ds(dsid):
    ds = DataSource.query.get(dsid)

    ds.name = flask.request.json["name"]
    ds.hierarchy_rank = flask.request.json["hierarchy_rank"]
    ds.api_key = flask.request.json["api_key"]

    db.session.commit()

    return data_source_schema.jsonify(ds)


@app.route("/sources/polls", methods=["POST"])
def add_feed():
    source_id = flask.request.json["source_id"]
    foid = flask.request.json["foid"]
    data_source_code = flask.request.json["data_source_code"]

    new_dsp = DataSourcePoll(
        source_id=source_id, foid=foid, data_source_code=data_source_code
    )

    db.session.add(new_dsp)
    db.session.commit()
    return data_source_poll_schema.jsonify(new_dsp)


@app.route("/sources/polls", methods=["GET"])
def get_all_data_source_polls():
    all_dsp = DataSourcePoll.query.all()
    result = data_source_polls_schema.dump(all_dsp)
    if result[1] == {}:  # result[1] is error group, adds layers to json if not removed
        result = result[0]
    return flask.jsonify(result)


@app.route("/sources/polls/<dspid>", methods=["PUT"])
def update_data_source_poll(dspid):
    dsp = DataSourcePoll.query.get(dspid)

    dsp.source_id = flask.request.json["source_id"]
    dsp.foid = flask.request.json["foid"]
    dsp.data_source_code = flask.request.json["data_source_code"]

    db.session.commit()

    return data_source_schema.jsonify(dsp)


@app.route("/sources/polls/<dspid>", methods=["DELETE"])
def delete_data_source_poll(dspid):
    dsp = DataSourcePoll.query.get(dspid)
    db.session.delete(dsp)
    db.session.commit()

    return data_source_poll_schema.jsonify(dsp)


@app.route("/settings", methods=["POST"])
def add_setting():
    key = flask.request.json["key"]
    value = flask.request.json["value"]

    new_setting = Settings(key=key, value=value)

    db.session.add(new_setting)
    db.session.commit()
    return setting_schema.jsonify(new_setting)


@app.route("/settings", methods=["GET"])
def get_all_settings():
    all_settings = Settings.query.all()
    result = settings_schema.dump(all_settings)
    if result:
        result = result[0]
    return flask.jsonify(result)


@app.route("/settings/<key>", methods=["GET"])
def get_setting(key):
    setting = Settings.query.filter(Settings.key == key)
    return setting_schema.jsonify(setting)


@app.route("/settings/<key>", methods=["PUT"])
def update_setting(key):
    setting = Settings.query.filter(Settings.key == key)
    setting.value = flask.request.json["value"]

    db.session.commit()
    return setting_schema.jsonify(setting)


@app.route("/settings/<key>", methods=["DELETE"])
def delete_setting(key):
    setting = Settings.query.filter(Settings.key == key)
    db.session.delete(setting)
    db.session.commit()
    return setting_schema.jsonify(setting)
