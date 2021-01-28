from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

from config import Config


def create_app(conf):
    app = Flask(__name__, static_folder="../minerva-ui/build")
    CORS(app)
    app.config.from_object(conf)
    db = SQLAlchemy(app)
    ma = Marshmallow(app)
    migrate = Migrate(app, db)
    return app, db, ma, migrate


app, db, ma, migrate = create_app(Config)

from app import routes, models
