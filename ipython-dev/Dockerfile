#note this is based on ubuntu 14.04.1 LTS
FROM truprint/jupyterbase

MAINTAINER John C. Earls <john.c.earls@gmail.com>

ENV PASSWORD 100i

RUN apt-get update && apt-get install -y python-mysqldb python-lxml \
                        libtiff4-dev libjpeg8-dev zlib1g-dev \
                        libfreetype6-dev liblcms2-dev libwebp-dev tcl8.5-dev tk8.5-dev \
                        python-tk postgresql libpq-dev python-psycopg2

RUN pip2.7 install SQLAlchemy beautifulsoup4 plotly brewer2mpl pytabix fitbit \
                        reportlab requests-oauthlib oauthlib  setuptools xlrd

#RUN pip install ete2
RUN pip2.7 install pillow


RUN pip2.7 install --upgrade seaborn

ADD quicksect /tmp

RUN cd /tmp && python setup.py install && rm -rf /tmp

#ADD scikit-bio /tmp

#RUN cd /tmp && python setup.py install && rm -rf /tmp

#RUN pip2.7 install --upgrade tornado
#RUN pip install --upgrade tornado

VOLUME ["/notebooks"]

ENV PATH /pythonpath:$PATH
VOLUME ["/pythonpath"]

