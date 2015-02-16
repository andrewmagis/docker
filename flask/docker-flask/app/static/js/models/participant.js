var Participant = Backbone.Model.extend({
    defaults:{'username':'none', 'gender':'none', 'age':'none'
    },
    idAttribute : 'username',
    urlRoot : '/participant',

    parse : function( response ){
        console.log( response );
        if( response.data ){
            return response.data;
        }
        return response;
    },
});

var ParticipantCollection  = Backbone.Collection.extend({
    model: Participant,
    url: '/participant',
    parse: function( response ){
        console.log(response);
        if( response.data){
            console.log("In response.data");
            console.log( response.data );
            return response.data;
        }
        return response
    },
});
