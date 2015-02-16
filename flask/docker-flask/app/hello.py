#!flask/bin/python
import sys
sys.path.append('/pythonpath')
from flask import Blueprint, Response, make_response
from flask import jsonify, abort, current_app
from flask import render_template
from flask import request
from flask import Flask
from p100.database import Database
from logging import FileHandler
import logging
import app_utils
import json
import subprocess

file_handler = FileHandler('mylog.log')
file_handler.setLevel(logging.DEBUG)

app = Flask(__name__)

app.logger.addHandler(file_handler)
app.config['PROPAGATE_EXCEPTIONS'] = True
@app.route('/')
def hello():
    return render_template('hello.html')

@app.route('/coachfeedback')
def test():
    return render_template('coachfeedback.html')

@app.route('/variables', methods=['GET'] )
@app.route('/variables/<feedback_id>', methods=['GET'] )
def get_variables( feedback_id = None ):
    if feedback_id is None:
        v = app_utils.get_variables()
    else:
        v = app_utils.get_variable(feedback_id)
    msg = {'status':'complete',
            'data' :v}
    status = 200
    return Response( json.dumps( msg ), mimetype='application/json', status=status) 

@app.route('/variables', methods=['POST'])
def add_variable( ):
    print request.form
    msg, status = app_utils.add_variable( request )
    return Response(    json.dumps( msg ), 
                        mimetype='application/json',
                        status=status )

@app.route('/participant', methods=['GET'] )
@app.route('/participant/<username>', methods=['GET'] )
def get_participants( username = None ):
    if username is None:
        v = app_utils.get_usernames()
    else:
        v = app_utils.get_participant(username)
    msg = {'status':'complete',
            'data' :v}
    status = 200
    return Response( json.dumps( msg ), mimetype='application/json', status=status) 

@app.route('/observation', methods=['GET'] )
@app.route('/observation/<username>', methods=['GET'])
def get_observations( username=None ):
    msg, status = app_utils.get_observations( username )
    return Response( json.dumps( msg ), mimetype='application/json', status=status) 
 
@app.route('/feedback', methods=['POST'])
def post_feedback():
    req = app_utils._req_to_dict( request )
    try:
        app_utils.add_observation( req['username'], req['round'], req['feedback'], req['value'])
        return Response( json.dumps({'status':'complete', 'data':[]}), mimetype="application/json", status=200)
    except:
        logging.exception("error on submit")
        return Response( json.dumps({'status':'error', 'data':[]}), mimetype="application/json", status=200)

@app.route('/deletevalue/<cf_values_id>', methods=['GET'])
def delete_value( cf_values_id ):
    app_utils.delete_value( cf_values_id )
    return Response( json.dumps({'status':'complete', 'data':[]}), mimetype="application/json", status=200)

@app.route('/datatypes', methods=['GET'])
def datatypes():
    msg, status = app_utils.get_datatypes()
    return Response( json.dumps(msg), 
                        mimetype="application/json",
                        status=200)

@app.route('/reload', methods=['GET'])
def reload_sytem():
    """
    Super hacky way to restart server
    """
    if True: #debugging
        subprocess.check_call(['touch', 'reload_me.txt'])
        return Response( json.dumps({'status':'complete', 'data':'reloading...'}), mimetype="application/json", status=200)
    else:
        print "debug", app.config['DEBUG']
        return Response( json.dumps({'status':'complete', 'data':'app not in debug mode'}), mimetype="application/json", status=200)

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', debug=True)
    except:
        app.logger.exception('Failed')


