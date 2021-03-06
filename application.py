#!/usr/bin/env python3
from app import app as application, db
from app.models import FinancialObject, TSData

import numpy as np
import pandas as pd


@application.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "FinancialObject": FinancialObject,
        "TSData": TSData,
        "np": np,
        "pd": pd,
    }


if __name__ == "__main__":
    application.run(debug=True, host="0.0.0.0", port=5000)
