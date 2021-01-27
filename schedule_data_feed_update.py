import schedule
import time

from data_extraction import TSAutoUpdater

schedule.every().day.at("02:00").do(TSAutoUpdater.update_all())


def run():
    while True:
        schedule.run_pending()
        time.sleep(60)


if __name__ == "__main__":
    run()

# import and call from main to activate
# do not activate until checking API usage limits
