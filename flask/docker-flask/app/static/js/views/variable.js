var VariableView = Backbone.View.extend({
    type : "VariableView",

    template : _.template( $('#template-variable').html() ),
    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)));
        this.model.on('change', this.render, this);
        this.model.on('delete', this.clear)
    },

    render : function(){
        var outputHtml = this.template( this.model.toJSON() );
        this.el = outputHtml;
        //$(this.el).html(outputHtml);
        return this;
    },

});

var VariableCollectionView = Backbone.View.extend({
    type : "VariableCollectionView",
    template : _.template( $('#template-variable-list').html() ),

    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)))
        this.collection.bind('add', this.addOne); 
        this.render();
    },

    events : {'change select#variables' : 'checkCat',
              'click #add-variable' : 'addVariable',
              'click div#category' : 'catHelp'
    },

    render : function(){
        var outputHtml = this.template();
        $(this.el).html( outputHtml );
        that = this;
        this.collection.fetch({
            add: true,
            success: that.loadComplete,
            error: that.loadError
        });
        return this;
    },
    loadComplete : function(){},

    /* Adds a defaultworkerview to the collection view  */
    addOne: function(foo) {
       view = new VariableView(
            {collection: this.collection,
                model:foo});
       console.log(view)
       this.$el.find('select#variables').append(view.render().el);
    },

    checkCat : function( ){
       s = this.$el.find('select#variables').val()
       console.log('test');
       curr_model = this.collection.get( s );
       c_cat = curr_model.get('categories');
       addCat = function ( cat_name ){
       $('#feedback-value').val(cat_name); 
       }
       if (c_cat && c_cat.length > 0){
           var template = _.template( $('#categorical-review').html());
           msg = template({categories : c_cat});
       } else {
           msg = '';
       }
       $('div#cat-display').html(msg);
    },

    catHelp : function(e){
        console.log(e);
    },

    addVariable : function(){
        if (app.vav){
            app.vav.cancelDescription();
        }
        app.vav = new VariableAddView();
        console.log('here')
    }
});

var VariableAddView = Backbone.View.extend({
    type:"VariableAddView",
    el:"div#variable-add",
    template : _.template($('#template-variable-add').html()),

    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)))
        this.getDataTypes()
        //this.render();
    },

    events : { 
        'click button#add-variables-button': 'submitDescription',
        'click button#cancel-variables-button':'cancelDescription'
    },

    render : function(){
        var outputHtml = this.template();
        console.log( outputHtml );
        $(this.el).append( outputHtml );
        return this;
    },

    getDataTypes : function(){
        var that = this;
        $.get( '/datatypes', function( res ){
            var outputHtml = that.template({datatypes:res.data});
            console.log( outputHtml );
            $(that.el).append( outputHtml );
        });
    },

    submitDescription : function(){
        data = {'datatype_id':this.$el.find('select').val(),
                'description':this.$el.find('#variable-add-description').val()}
        console.log(data);
        var that = this;
        $.post( '/variables', data, function(response){
            that.cancelDescription();
        app.vcv.collection.fetch({ add: true });
        });

    },

    cancelDescription : function(){
        this.$el.html('');
        app.vav = undefined; 
    }

});
