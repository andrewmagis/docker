
var ParticipantView = Backbone.View.extend({
   
    type : "ParticipantView",

    template : _.template( $('#template-participant').html() ),
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

var ParticipantActiveView = Backbone.View.extend({
    type : "ParticipantActiveView",
    el : "div#participant-active",
    template : _.template( $('#template-participant-selected').html() ),
    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)));
        this.model = new Participant();
        this.model.url = '/participant/' + $('#participants').val();
        this.model.fetch();
        this.model.on('change', this.render, this);
    },

    changeUser : function(){
        this.model = new Participant();
        this.model.url = '/participant/' + $('#participants').val();
        this.model.fetch();
        this.model.on('change', this.render, this);
        console.log( 'changeuser');
        console.log(this.model);
    },
    render : function(){
        var outputHtml = this.template( this.model.toJSON() );
        $(this.el).html(outputHtml);
        return this;
    },

});

var ParticipantCollectionView = Backbone.View.extend({
    type : "ParticipantCollectionView",
    template : _.template( $('#template-participant-list').html() ),

    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)))
        this.collection.bind('add', this.addOne); 
        this.render();
    },

    events : {
         "change #participants": "changeParticipants"
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
       view = new ParticipantView(
            {collection: this.collection,
                model:foo});
       console.log(view)
       this.$el.find('select#participants').append(view.render().el);
    },
    changeParticipants: function(){
        app.ocv.changeUser();
        app.pav.changeUser();
    },

});
