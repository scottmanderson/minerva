from app.models import DataSource, DataSourcePoll


def fetch_all_data_sources():
    try:
        all_data_sources = DataSource.query.all()
    except Exception:
        print("error fetching data sources; table likely empty")
        all_data_sources = []
    return all_data_sources


def fetch_all_data_source_polls():
    try:
        all_data_source_polls = DataSourcePoll.query.all()
    except Exception:
        print("error fetching data source polls; table likely empty")
        all_data_source_polls = []
    return all_data_source_polls
