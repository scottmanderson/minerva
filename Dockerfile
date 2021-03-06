FROM python:3.7

RUN useradd -ms /bin/bash -p athena minerva
WORKDIR /home/minerva_app
ARG FLASK_ENV="development"
ENV FLASK_ENV="${FLASK_ENV}" \
    PYTHONUNBUFFERED="true"

COPY requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt

COPY . .

RUN chmod +x application.py
RUN chown -R minerva:minerva ./
# RUN chmod +x boot.sh
# RUN chown -R minerva:minerva ./

USER minerva
CMD ["python", "./create_db.py"]

EXPOSE 5000
ENTRYPOINT ["./application.py"]
