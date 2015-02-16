import random
from p100.database import Database
from p100.participant import Participants
from p100.coachfeedback import Feedback

def get_variable( feedback_id ):
    f = Feedback( Database() )
    fb = f.GetFeedbackDescriptions( feedback_id )
    cat = []
    if fb['datatype'][0] == 4:
        cat = f.GetCategories( feedback_id )
        if cat is not None:
            cat = sorted(cat.tolist())
    return {'feedback_id' : feedback_id, 
            'description': fb['description'][0], 
            'datatype': fb['datatype'][0],
            'categories': cat
            }

def get_variables():
    vars = []
    f = Feedback( Database() )
    fdb_df = f.GetFeedbackDescriptions()
    fdb_df.sort(['description'], inplace=True)
    for i,row in fdb_df.iterrows():
        cat = []
        if row['datatype_id'] == 4:
            cat = f.GetCategories( row['feedback_id']  )
            if cat is not None:
                cat = sorted(cat['value'].tolist())
        vars.append( {'feedback_id' : row['feedback_id'],
            'description': row['description'],
            'datatype_id':row['datatype_id'],
            'datatype': row['datatype'],
            'categories':cat
            })
    return vars

def add_variable( request ):
    req_d = _req_to_dict( request )
    f = Feedback( Database() )
    print "here 2"
    feedback_id = f.AddFeedback( req_d['description'],
            req_d['datatype_id'])
    print feedback_id
    msg = {'status': 'complete',
            'data' : get_variable(feedback_id)}
    return (msg, 200)

def get_datatypes():
    f = Feedback( Database() )
    dt = f.GetDatatypes()
    dt = [{'datatype_id':i,'datatype':v} for i,v in dt.iteritems()]
    msg = {'status': 'complete',
            'data' : dt }
    return (msg, 200)


def get_participant( username ):
    d = Database()
    
    p_df = Participants(d)._get_all_participants()
    temp = [get_username(i, row['gender'], row['age']) for i,row in p_df.iterrows() if i == username]
    if len(temp) == 0:

        temp = [get_username(i, row['gender'], row['age']) for i,row in p_df.iterrows()]
    return temp[0]


def get_username( username, gender, age ):
    if gender == 0:
        gender = 'Female'
    else:
        gender = 'Male'
    return {'username':username, 'gender':gender, 'age':age}

def get_usernames():
    d = Database()
    p_df = Participants(d)._get_all_participants()
    return [get_username(i, row['gender'], row['age']) for i,row in p_df.iterrows()]

def add_observation( username, round, feedback_id, value ):
    value = value.strip()
    f = Feedback( Database() )
    obs_id = f.AddObservation( username, round )
    vid = f.AddValue( feedback_id, obs_id, value )
    return vid

def delete_value( cf_value_id):
    f = Feedback( Database() )
    f.DeleteValue( cf_value_id )

def get_observations( username ):
    f = Feedback( Database() )
    fb_dv = f.GetData( username=username )
    res = []
    
    if fb_dv is not None:
        fb_dv.sort(['description', 'round'], inplace=True)
        for i,row in fb_dv.iterrows():
            res.append({
                'username' : row['username'],
                'observation_id': row['observation_id'],
                'round' : row['round'],
                'description' : row['description'],
                'value' : row['value'],
                'cf_values_id' : row['cf_values_id']
            })

    msg = {'status': 'complete',
            'data' : res 
            }
    return (msg, 200)
    

def _req_to_dict( request):
    """
    Takes a Request object and returns a dictionary
    """
    req_d = request.get_json(silent=True)
    if not req_d:
        req_d = request.form.to_dict()  
    for key, value in req_d.iteritems():
        try:
            req_d[key] = value.strip()
        except AttributeError as ae:
            pass
    return req_d
