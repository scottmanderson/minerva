FROM python:3.8

RUN useradd -ms /bin/bash -p athena minerva
WORKDIR /home/minerva_app
ARG FLASK_ENV="production"
ENV FLASK_ENV="${FLASK_ENV}" \
    PYTHONUNBUFFERED="true"

COPY requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt

COPY . .

RUN chmod +x boot.sh
# RUN chown -R minverva:minverva ./

USER minerva
CMD ["python", "./database/create_db.py"]

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
