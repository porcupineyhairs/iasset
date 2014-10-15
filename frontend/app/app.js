'use strict';
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import Quoter from 'iasset/utils/quotes';
import Authenticator from 'iasset/utils/authenticator';
import ENV from 'iasset/config/environment';

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

/*
Ember.Select2 = Ember.Select.extend({
    // prompt: 'Please select...',
    // classNames: ['input-xlarge'],

    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
    },

    processChildElements: function() {
        $().select2({
        });
    },

    willDestroyElement: function() {
        Ember.$.select2('destroy');
    },
});*/

Ember.Application.initializer({
    name: 'authentication',
    before: 'simple-auth',
    initialize: function(container, application) {
        container.register('authenticator:custom', Authenticator);
    }
});

var App = Ember.Application.extend({
    modulePrefix: 'iasset', // TODO: loaded via config
    Resolver: Resolver
});

loadInitializers(App, 'iasset');

App.quoter = Quoter.create();
if (ENV.environment === 'production') {
    App.quoter.start();
}

export default App;
