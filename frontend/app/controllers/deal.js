'use strict';
import Ember from 'ember';
import App from 'iasset/app';

export default Ember.ObjectController.extend({
    quote: function() {
        var self = this;
        var symbol = this.get('ulSymbol');
        App.quoter.on('quote', function() { 
            var quote = App.quoter.getQuote(symbol);
            self.set('quote', quote);
        });
        return { name: '', lastPrice: 0.0, timeStamp: Date.now() };
    }.property('ulSymbol'),

    // TODO these properties rely on 'quote' to update when the promise resolves, seem to be a bit hacky
    // find the 'canonical' ways 
    ulName: function(value) {
        return this.get('quote').name;
    }.property('quote'),

    ulLastPrice: function() {
        return this.get('quote').lastPrice;
    }.property('quote'),

    ulUpdateTm: function() {
        return this.get('quote').timeStamp;
    }.property('quote'),

    alpha: function() {
        return 0.69;
    }.property('ulLastPrice'),

    riskLevel: function() {
        var alpha = this.get('alpha');
        if (alpha < this.get('dangerLevel')) {
            return 'danger';
        }
        else if (alpha < this.get('warningLevel')) {
            return 'warning';
        }
        else {
            return '';
        }
    }.property('alpha'),
    // END quote related
});
