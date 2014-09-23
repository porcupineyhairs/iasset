'use strict';
import Ember from 'ember';
import Pollster from 'iasset/utils/pollster';
import SinaQuoter from 'iasset/utils/sina_quoter';

export default Ember.Object.extend(Ember.Evented, {
    quoter: SinaQuoter.create(),

    getQuote: function(symbol) {
        var quotes = this.get('quotes');
        if (Ember.isNone(quotes[symbol])) {
            quotes[symbol] = { name: '', lastPrice: 0.0, timeStamp: Date.now() };
        }
        return quotes[symbol];
    },

    requestQuotes: function() {
        var quotes = this.get('quotes');
        var symbols = [];
        var self = this;
        for (var symbol in quotes) { symbols.push(symbol); }

        // start send quote request, and update local quote cache on response
        this.quoter.requestQuotes(symbols, function(newQuotes) {
            var quotes = self.get('quotes');
            var symbols = [];
            for (var symbol in quotes) { symbols.push(symbol); }
            if (newQuotes) {
                console.log('Got new quotes: ', newQuotes);
                for (var i = 0; i < newQuotes.length; ++i) {
                    quotes[newQuotes[i].symbol] = newQuotes[i];
                }
            }
        });
    },

    init: function() {
        var self = this;
        this.set('quotes', {});
        if (Ember.isNone(this.get('pollster'))) {
            this.set('pollster', Pollster.create({
                onPoll: function() {
                    self.requestQuotes();
                    self.trigger('quote');
                }
            }));
        }
    },

    start: function() {
        this.get('pollster').start();
    },
});
