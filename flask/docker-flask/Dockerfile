
FROM ipython/scipyserver:latest

MAINTAINER Phillip Bailey <phillip@bailey.st>

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get -y install nginx  sed python-pip python-dev uwsgi-plugin-python supervisor  python-mysqldb 

RUN mkdir -p /var/log/nginx/app
RUN mkdir -p /var/log/uwsgi/app/


RUN rm /etc/nginx/sites-enabled/default
COPY flask.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/flask.conf /etc/nginx/sites-enabled/flask.conf
COPY uwsgi.ini /var/www/app/


RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#copy app /var/www/app
VOLUME ["/var/www/app"]
#RUN pip install -r /var/www/app/requirements.txt
RUN pip install flask uwsgi 

RUN pip install --upgrade pip

RUN apt-get update && apt-get install -y python-mysqldb python-lxml \
                        libtiff4-dev libjpeg8-dev zlib1g-dev \
                        libfreetype6-dev liblcms2-dev libwebp-dev tcl8.5-dev tk8.5-dev \
                        python-tk

RUN pip install ete2  SQLAlchemy beautifulsoup4 plotly brewer2mpl pytabix fitbit \
                        reportlab requests-oauthlib oauthlib  setuptools xlrd
RUN pip install pillow

RUN pip install --upgrade seaborn

ADD quicksect /tmp

RUN cd /tmp && python setup.py install && rm -rf /tmp

ADD scikit-bio /tmp

RUN cd /tmp && python setup.py install && rm -rf /tmp

CMD ["/usr/bin/supervisord"]
