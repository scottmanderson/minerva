from app import app, db
from app.models import (
    FinancialObject,
    FinancialObjectSchema,
    TSData,
    TSDataSchema,
    DataSource,
)
from app.quant import TSCalc, TSCalcSchema
from config import basedir

import flask
import json

financial_object_schema = FinancialObjectSchema()
financial_objects_schema = FinancialObjectSchema(many=True)
ts_data_schema = TSDataSchema()
ts_calc_schema = TSCalcSchema()

all_data_sources = DataSource.query.all()
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
    return financial_objects_schema.jsonify(fo)


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
@app.route(
    "/stat/<foid>", methods=["GET"]
)  # TODO must reimplement start/end for non-default in query string
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


@app.route("/charts/returns/<foid>", methods=["GET"])
def get_bokeh_return_plot(foid):
    freq_code = flask.request.args.get("freq_code")
    start = flask.request.args.get("start")
    end = flask.request.args.get("end")
    benchmark = flask.request.args.get("benchmark")
    div_id_target = flask.request.args.get("div_id_target")
    print(
        f"foid={foid} freq_code={freq_code} start={start} end={end} benchmark={benchmark} div_id_target={div_id_target}"
    )
    calc = TSCalc(
        foid=foid,
        freq_code=freq_code,
        start=start,
        end=end,
        benchmark=benchmark,
        div_id_target=div_id_target,
    )
    return json.dumps(calc.generate_bokeh_return_plot())
