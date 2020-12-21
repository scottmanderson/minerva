from app import app, application, db
from app.models import FinancialObject, TSData

import numpy as np
import pandas as pd


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "FinancialObject": FinancialObject,
        "TSData": TSData,
        "np": np,
        "pd": pd,
    }
