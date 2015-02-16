var Observation = Backbone.Model.extend({
    idAttribute : 'obs_id',
    urlRoot : '/observation',

    parse : function( response ){
        console.log( response );
        if( response.data ){
            return response.data;
        }
        return response;
    },
});

var ObservationCollection  = Backbone.Collection.extend({
    defaults:{'username':'9999998'},
    model : Observation,
    url:'/observation',

    parse: function( response ){
        console.log(response);
        if( response.data){
            console.log("In response.data");
            console.log( response.data );
            return response.data;
        }
        return response
    },

    getUrl : function(){
         this.url = '/observation/' + this.get('username');
    },


});
