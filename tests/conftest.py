import pytest

from app import create_app, db
from config import TestConfig


@pytest.fixture
def test_client():
    flask_app = create_app(TestConfig)
    with flask_app.test_client() as testing_client:
        with flask_app.app_context():
            yield testing_client


@pytest.fixture
def init_database(test_client):
    db.create_all()
    yield
    db.drop_all()
