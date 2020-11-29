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
)
from app.quant import TSCalc, TSCalcSchema
from config import basedir
from shared_functions import fetch_all_data_sources
import flask
import json

financial_object_schema = FinancialObjectSchema()
financial_objects_schema = FinancialObjectSchema(many=True)
ts_data_schema = TSDataSchema()
ts_calc_schema = TSCalcSchema()
data_source_schema = DataSourceSchema()
data_sources_schema = DataSourceSchema(many=True)
data_source_poll_schema = DataSourcePollSchema()
data_source_polls_schema = DataSourcePollSchema(many=True)

all_data_sources = fetch_all_data_sources()
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}


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

    return ts_data_schema.jsonify(new_tsi)


@app.route("/ts_level/<foid>", methods=["GET"])
def get_ts_level(foid):
    TSCalc.compute_ts_level(foid)  # Todo: not done


@app.route("/ts_returns/<foid>/<freq>", methods=["GET"])
def get_ts_returns(foid, freq):
    TSCalc.compute_ts_returns(foid, freq)  # Todo: not done


@app.route("/tsi/<tsid>", methods=["GET"])
def get_tsi(tsid):
    tsi = TSData.query.get(tsid)
    return ts_data_schema.jsonify(tsi)


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
    return ts_data_schema.jsonify(tsi)


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
    benchmark = flask.request.args.get("benchmark")

    calc = TSCalc(
        foid=foid, freq_code=freq_code, start=start, end=end, benchmark=benchmark
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
