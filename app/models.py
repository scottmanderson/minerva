from app import app, db, ma


class FinancialObject(db.Model):
    __tablename__ = "financial_objects"
    foid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    report_name = db.Column(db.String(100))
    ticker = db.Column(db.String(20))
    benchmark = db.Column(db.Integer)
    ts_relationship = db.relationship(
        "TSData",
        backref="FinancialObject",
        cascade="all, delete, delete-orphan",
        lazy="dynamic",
        single_parent=True,
        order_by="asc(TSData.dt)",
    )
    data_source_poll_relationship = db.relationship(
        "DataSourcePoll", backref="FinancialObject"
    )

    def __init__(self, name, report_name, ticker=None):
        self.name = name
        self.report_name = report_name or name
        self.ticker = ticker


class TSData(db.Model):
    __tablename__ = "ts_data"
    tsid = db.Column(db.Integer, primary_key=True)
    foid = db.Column(db.Integer, db.ForeignKey("financial_objects.foid"))
    dt = db.Column(db.DateTime)
    level = db.Column(db.Float)
    source = db.Column(db.String(100))


class DataSource(db.Model):
    __tablename__ = "data_sources"
    source_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    hierarchy_rank = db.Column(db.Integer)
    api_key = db.Column(db.String(100))
    poll_relationship = db.relationship("DataSourcePoll", backref="DataSource")

    def __init__(self, name, hierarchy_rank, api_key):
        self.name = name
        self.hierarchy_rank = hierarchy_rank
        self.api_key = api_key


class DataSourcePoll(db.Model):
    __tablename__ = "data_source_polls"
    ds_poll_id = db.Column(db.Integer, primary_key=True)
    source_id = db.Column(db.Integer, db.ForeignKey("data_sources.source_id"))
    foid = db.Column(db.Integer, db.ForeignKey("financial_objects.foid"))
    data_source_code = db.Column(db.String(50))


class DataSourceSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = DataSource
        load_instance = True


class TSDataSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = TSData
        load_instance = True


class FinancialObjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FinancialObject
        load_instance = True
