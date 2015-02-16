var ObservationView = Backbone.View.extend({
    type:'ObservationView',
    tagName : "tr",
    className : "default",
    template: _.template($('#template-observation-row').html()),
    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)));
        this.model.on('change', this.render, this);
        this.model.on('delete', this.clear)
    },

    events : {
        'click button#delete' : 'deleteObservation'
    },
    render : function(){
        var outputHtml = this.template( this.model.toJSON() );
        //#this.el = outputHtml;
        $(this.el).html(outputHtml);
        return this;
    },

    deleteObservation : function(){
        $.get('/deletevalue/' + this.model.get('cf_values_id'), function( data ){
            app.ocv.changeUser();
        });
    }

});

var ObservationCollectionView = Backbone.View.extend({
    type:'ObservationCollectionView',
    el: "#observation-table", 
    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)))
        this.views = new Array();
        this.collection.bind('add', this.addOne); 
        this.collection.url = '/observation/' + $('#participants').val();
        this.collection.fetch({  add : true});
        this.render();
    },

    events : {'click span#round-sort' : 'sortRound',
            'click span#desc-sort' : 'sortDesc'
    },

    render : function(){
        return this;
    },
    loadComplete : function(){},

    addOne: function(foo) {
        //console.log('adding one');
        view = new ObservationView(
            {model:foo});
       //console.log(view)
       this.$el.append(view.render().el);
       this.views.push( view );
    },

    sortDesc : function(){
        var rs = $('span#desc-sort').attr('class');
        console.log(rs);
        if( rs == 'ascending' ){
            this.sortView('description', true);
        } else {
            this.sortView('description', false);
        }
        $('span#desc-sort').toggleClass('ascending');

    },

    sortRound : function(){
        var rs = $('span#round-sort').attr('class');
        console.log(rs);
        if( rs == 'ascending' ){
            this.sortView('round', true);
        } else {
            this.sortView('round', false);
        }
        $('span#round-sort').toggleClass('ascending');
    },

    sortView : function(variable, ascending ){
        this.removeAll();
        var coll = this.collection.sortBy(variable);
        if( ascending){
            coll = coll.reverse();
        }
        that = this;
        _.map(coll, function( v ){
            that.addOne(v);
        });
    },

    removeAll : function(){
        _.map(this.views, function( v ){
            v.remove();
        });
        this.views = new Array();
    },

    changeUser : function(){
        console.log('changing user');
        this.$el.find('tr.default').remove();
        this.collection = new ObservationCollection();
        this.collection.bind('add', this.addOne); 
        this.collection.url = '/observation/' + $('#participants').val();
        this.collection.fetch({'add':true});
        this.render();

    }

});

var ValueForm = Backbone.View.extend({
    type : "ValueForm",
    el : "form#base",
    initialize : function(){
        _.bindAll.apply(_, [this].concat(_.functions(this)));
    },

    events : {
        'click #submit-button' : 'submitForm',

    },
    submitForm : function(){
        var arr = this.$el.serializeArray();

 
        var data = _(arr).reduce( function( acc, field ){
            acc[field.name] = field.value;
            return acc;
        }, {});
        console.log('here')
        console.log(data);
        $.post('/feedback', data, function( data ){
            app.ocv.changeUser();
            console.log("back");
            console.log(data);
        });
    }

});
