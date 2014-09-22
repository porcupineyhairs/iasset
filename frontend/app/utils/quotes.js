'use strict';
import Ember from 'ember';
import Pollster from 'iasset/utils/pollster';

/* global ic */
var ajax = ic.ajax;

var Quotes = Ember.Object.extend({
});

export default Ember.Object.extend(Ember.Evented, {
    baseQuoteUrl: 'http://hq.sinajs.cn/list=',

    getQuote: function(symbol) {
        var quotes = this.get('quotes');
        if (Ember.isNone(quotes[symbol])) {
            quotes[symbol] = { name: '', lastPrice: 0.0, timeStamp: Date.now() };
        }
        return quotes[symbol];
    },

    updateQuotes: function() {
        var quotes = this.get('quotes');
        for (var symbol in quotes) {
            var symbolArray = symbol.split('.');
            if (['sh', 'SH', 'ss', 'SS'].contains(symbolArray[1])) {
                symbolArray[1] = 'sh';
            }
            else if (['sz', 'SZ'].contains(symbolArray[1])) {
                symbolArray[1] = 'sz';
            }

            var sinaSymbol = symbolArray[1] + symbolArray[0];
            var quoteUrl = this.baseQuoteUrl + sinaSymbol;
            console.log('Requesting quote from: ' + quoteUrl);
            var self = this;
            return ajax.request(quoteUrl).then(function (quoteReturn) {
                var parsed = self._parseQuoteReturn(quoteReturn);
                parsed.symbol = symbol;
                parsed.timeStamp = Date.now(); // milliseconds since epoch
                console.log('Got quote: ', parsed);
                quotes[symbol] = parsed;
            });
        }
    },

    _parseQuoteReturn: function (quoteReturn) {
        var retArray = quoteReturn.split('="')[1].split(',');
        var stockName = retArray[0];
        var lastPrice = retArray[1];
        return { name: stockName, lastPrice: lastPrice };
    },

    init: function() {
        var self = this;
        this.set('quotes', {});
        if (Ember.isNone(this.get('pollster'))) {
            this.set('pollster', Pollster.create({
                onPoll: function() {
                    self.updateQuotes();
                    self.trigger('quote');
                }
            }));
        }
        this.get('pollster').start();
    },
});
