import os
from dotenv import load_dotenv

load_dotenv(verbose=True)
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # JSON_SORT_KEYS is True by default to preserve cacheability, but
    # since dictionaries are ordered starting in python 3.6 there is no penalty to disabling this
    JSON_SORT_KEYS = False
    SQLALCHEMY_DATABASE_URI = (
        os.environ.get("DATABASE_URI")
        # or "postgresql://localhost/minervaDB"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
