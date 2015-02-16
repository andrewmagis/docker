var Variable = Backbone.Model.extend({
    idAttribute : 'feedback_id',
    urlRoot : '/variables',
    parse : function( response ){
        console.log( response );
        if( response.data ){
            return response.data;
        }
        return response;
    },
});

var VariableCollection = Backbone.Collection.extend({
    model: Variable,
    url: '/variables',
    parse : function( response ){
        console.log( response );
        if( response.data ){
            console.log("In response.data");
            console.log( response.data );
            return response.data;
        }
        return response;
    },

});
