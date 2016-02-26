FROM python:2.7
RUN pip install uwsgi
RUN apt-get update
ENV PYTHONUNBUFFERED 1
ENV PROJECT_PATH /usr/src/app
EXPOSE 8000
WORKDIR /usr/src/app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . /usr/src/app
#CMD cd /usr/src/app && python manage.py migrate && python manage.py runserver 0.0.0.0:8000
CMD cd /usr/src/app && python manage.py migrate && uwsgi --ini uwsgi.ini
