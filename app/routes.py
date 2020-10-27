from app import app, db
from app.models import FinancialObject, FinancialObjectSchema, TSData, TSDataSchema, DataSource
from config import basedir

import flask
import json

financial_object_schema = FinancialObjectSchema()
financial_objects_schema = FinancialObjectSchema(many=True)
ts_data_schema = TSDataSchema()

all_data_sources = DataSource.query.all()
ts_hierarchy = {source.name: source.hierarchy_rank for source in all_data_sources}


# Basic Object Manipulation Routes
@app.route('/fo', methods=['POST'])
def add_financial_object():
    name = flask.request.json['name']
    report_name = flask.request.json['report_name']
    ticker = flask.request.json['ticker']

    new_fo = FinancialObject(name=name, report_name=report_name, ticker=ticker)

    db.session.add(new_fo)
    db.session.commit()
    return financial_object_schema.jsonify(new_fo)


@app.route('/fo', methods=['GET'])
def get_all_fo():
    all_fo = FinancialObject.query.all()
    result = financial_objects_schema.dump(all_fo)
    if result[1] == {}:  # result[1] is error group, adds layers to json if not removed
        result = result[0]
    return flask.jsonify(result)


@app.route('/fo/<foid>', methods=['GET'])
def get_fo(foid):
    fo = FinancialObject.query.get(foid)
    return financial_objects_schema.jsonify(fo)


@app.route('/fo/<foid>', methods=['PUT'])
def update_fo(foid):
    fo = FinancialObject.query.get(foid)

    name = flask.request.json['name']
    report_name = flask.request.json['report_name']
    ticker = flask.request.json['ticker']

    fo.name = name
    fo.report_name = report_name
    fo.ticker = ticker

    db.session.commit()

    return financial_object_schema.jsonify(fo)


@app.route('/fo/<foid>', methods=['DELETE'])
def delete_financial_object(foid):
    fo = FinancialObject.query.get(foid)
    db.session.delete(fo)
    db.session.commit()

    return financial_object_schema.jsonify(fo)


# Time Series Manipulation Routes (pure TS, without calculation)
@app.route('/tsi', methods=['POST'])
def add_tsi():
    foid = flask.request.json['foid']
    dt = flask.request.json['dt']
    level = flask.request.json['level']
    source = flask.request.json['source']

    new_tsi = TSData(foid=foid, dt=dt, level=level, source=source)

    db.session.add(new_tsi)
    db.session.commit()

    return ts_data_schema.jsonify(new_tsi)


@app.route('/tsi/<tsid>', methods=['GET'])
def get_tsi(tsid):
    tsi = TSData.query.get(tsid)
    return ts_data_schema.jsonify(tsi)


@app.route('/tsi/<tsid>', methods=['PUT'])
def update_tsi(tsid):
    tsi = TSData.query.get(tsid)

    foid = flask.request.json['foid']
    dt = flask.request.json['dt']
    level = flask.request.json['level']
    source = flask.request.json['source']

    tsi.foid = foid
    tsi.dt = dt
    tsi.level = level
    tsi.source = source

    db.session.commit()
    return ts_data_schema.jsonify(tsi)


@app.route('/tsi/<tsid>', methods=['DELETE'])
def delete_tsi(tsid):
    tsi = TSData.query.get(tsid)
    db.session.delete(tsi)
    db.session.commit()

    return financial_object_schema.jsonify(tsi)
