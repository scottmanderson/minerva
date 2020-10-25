from app import app, db, ma


class FinancialObject(db.Model):
    __tablename__ = 'financial_objects'
    foid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    report_name = db.Column(db.String(100))
    ticker = db.Column(db.String(20))
    ts_relationship = db.relationship('TSData',
                                      backref='FinancialObject',
                                      cascade='all, delete, delete-orphan',
                                      lazy='dynamic',
                                      single_parent=True,
                                      order_by='asc(TSData.dt)')

    def __init__(self, name, report_name, ticker=None):
        self.name = name
        self.report_name = report_name or name
        self.ticker = ticker


class TSData(db.Model):
    __tablename__ = 'ts_data'
    tsid = db.Column(db.Integer, primary_key=True)
    foid = db.Column(db.Integer, db.ForeignKey('financial_objects.foid'))
    dt = db.Column(db.DateTime)
    level = db.Column(db.Float)
    source = db.Column(db.String(100))


class TSDataSchema(ma.Schema):
    class Meta:
        model = TSData
        load_instance = True


class FinancialObjectSchema(ma.Schema):
    class Meta:
        model = FinancialObject
        load_instance = True
