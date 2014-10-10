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

    fee: function() {
        return 42;
        return {
            fee1: 42
        };
    }.property(),

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

    ulDividend: function() {
        return 1;
    }.property(),

    alpha: function() {
        var dealType = this.get('dealType');
        var ulQuantity = this.get('ulQuantity');
        var ulLastPrice = this.get('ulLastPrice');

        var ulMarketValue = ulQuantity * ulLastPrice;
        var ulDividendValue = ulQuantity * this.get('ulDividend') / 10;
        var totalMargin = this.get('margin'); // + extra margin
        var nominalValue = this.get('nominalValue');

        if (dealType == '融资') {
            return (ulMarketValue + ulDividendValue + totalMargin) / nominalValue;
        }
        else if (dealType == '融券') {
            return totalMargin / ulMarketValue;
        }
        return 0.69;
    }.property('ulLastPrice'),

    durationStyle: function() {
        var today = moment();
        var expiryDate = moment(this.get('expiryDate'));
        var dateDiff = moment.duration(expiryDate - today).asDays();
        return dateDiff < 3 ? 'background-color: red': '';
    }.property('expiryDate'),

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
