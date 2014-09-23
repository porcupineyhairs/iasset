'use strict';
import Ember from 'ember';

/* global jQuery */

export default Ember.Object.extend({

    makeSinaSymbol: function(symbol) {
        var symbolArray = symbol.split('.');
        if (['sh', 'SH', 'ss', 'SS'].contains(symbolArray[1])) {
            symbolArray[1] = 'sh';
        }
        else if (['sz', 'SZ'].contains(symbolArray[1])) {
            symbolArray[1] = 'sz';
        }
        return symbolArray[1] + symbolArray[0];
    },

    makeSinaQuoteUrl: function(symbols) {
        var baseQuoteUrl = 'http://hq.sinajs.cn/list='; 
        var sinaSymbols = [];
        for (var i = 0; i < symbols.length; ++i) { sinaSymbols.push(this.makeSinaSymbol(symbols[i])); }
        return baseQuoteUrl + sinaSymbols.join(',');
    },

    requestQuotes: function(symbols, callback) {
        var preRequestUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22';
        var postRequestUrl = "%22&format=html&callback=?";

        var quoteUrl = this.makeSinaQuoteUrl(symbols);
        var self = this;
        var request = preRequestUrl + encodeURIComponent(quoteUrl) + postRequestUrl;
        // console.log('Requesting quote from: ' + request);
        jQuery.getJSON(request, function(quoteResp) {
            var quotes = self.parseQuoteResponse(symbols, quoteResp.results[0]);
            callback(quotes);
        });
    },

    parseQuoteResponse: function (symbols, quoteResp) {
        if (!quoteResp) { return; }
        // strip HTML tags added by YQL
        var scriptText = quoteResp.replace(/<(?:.|\n)*?>/gm, '');
        var scriptArray = scriptText.split(';');
        var parsedResp = {};
        for (var i = 0; i < scriptArray.length; ++i) {
            var expr = scriptArray[i].replace('var hq_str_', '');
            var exprArray = expr.replace('"', '').split('=');
            if (exprArray.length >= 2) {
                parsedResp[exprArray[0].trim()] = exprArray[1].trim();
            }
        }
        // console.log(parsedResp);
        // Match with RIC style symbols
        var ret = [];
        for (var j = 0; j < symbols.length; ++j) {
            var symbol = symbols[j];
            var sinaSymbol = this.makeSinaSymbol(symbol);
            if (sinaSymbol in parsedResp) {
                var sinaQuote = parsedResp[sinaSymbol].split(',');
                ret.push({ symbol: symbol, name: sinaQuote[0], lastPrice: sinaQuote[1], timeStamp: Date.now() });
            }
        }
        return ret;
    },
});

