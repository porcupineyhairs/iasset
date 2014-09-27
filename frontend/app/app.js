'use strict';
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import Quoter from 'iasset/utils/quotes';

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.RadioButton = Ember.View.extend({
    tagName: 'input',
    type: 'radio',
    arrBinding: 'App.ApplicationController.content',
    attributeBindings: ['name', 'type', 'value', 'checked:checked:'],
    click: function () {
        this.set('selection', this.$().val());
    },
    checked: function () {
        return this.get('value') === this.get('selection');
    }.property()
});

var App = Ember.Application.extend({
    modulePrefix: 'iasset', // TODO: loaded via config
    Resolver: Resolver
});

loadInitializers(App, 'iasset');

App.quoter = Quoter.create();
// App.quoter.start();

export default App;
