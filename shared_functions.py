from app.models import DataSource


def fetch_all_data_sources():
    try:
        all_data_sources = DataSource.query.all()
    except Exception:
        print("error fetching data sources; table likely empty")
        all_data_sources = []
    return all_data_sources
