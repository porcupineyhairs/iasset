'use strict';
import Ember from 'ember';
import App from 'iasset/app';

/* global moment */
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

    repoFees: function() {
        var txnBalance = this.get('transferTxnAmount') - this.get('nominalTransferAmount');
        var repoBalance = 0;
        var anualizedDaysToRepo = this.get('daysToRepo') / 365;
        var anualizedDaysToTxnPayback = this.get('daysToTxnPayback') / 365;
        var actualRepoAmount = this.get('nominalTransferAmount') * (1 + this.get('transferFee1') * anualizedDaysToRepo)
                             + txnBalance * this.get('tranferFee2') * anualizedDaysToTxnPayback;
        var prepaidResetAmount = this.get('nominalTransferAmount') * this.get('transferFee1') 
                               * this.get('daysOfCurrentResetCycle') / 365;
        var firstPrepaidActualRepoAmount = txnBalance * this.get('tranferFee2') * anualizedDaysToTxnPayback;
        var prepaidActualRepoAmount = this.get('nominalTransferAmount') * (1 + this.get('transferFee1') * this.get('daysOfCurrentResetCycle') / 365);
        var remainingActualRepoAmount = 0;

        return {
            txnBalance: txnBalance,
            repoBalance: repoBalance,
            actualRepoAmount: actualRepoAmount,
            firstPrepaidActualRepoAmount: firstPrepaidActualRepoAmount,
            prepaidActualRepoAmount: prepaidActualRepoAmount,
            remainingActualRepoAmount: remainingActualRepoAmount,
            prepaidResetAmount: prepaidResetAmount,
            trustFee: 0,
            custodianFee: 0,
            unknownFee1: 0,
        };
    },

    shortSellFees: function() {
        var txnAmount = this.get('txnPrice') * this.get('txnQuantity');
        var nextCost = txnAmount * this.get('rate') * this.get('daysOfCurrentResetCycle') / 365;
        var cost = txnAmount * this.get('daysToRepo') / 365;
        var remainingCost = 0;
        var margin1 = this.get('initialMargin') * 0.08;
        var margin2 = this.get('borrowTxnAmount'); 
        var margin3 = this.get('initialMargin') - margin1 - margin2; 
        var repaidMargin1 = this.get('returnTxnAmount');
        var repaidMargin2 = margin1 + margin2 + margin3 + this.get('extraMargin') - repaidMargin1;

        return {
            cost: cost,
            nextCost: nextCost,
            remainingCost: remainingCost,
            margin1: margin1,
            margin2: margin2,
            margin3: margin3,
            repaidMargin1: repaidMargin1,
            repaidMargin2: repaidMargin2,
        };
    },

    fees: function() {
        var dealType = this.get('dealType');
        if (dealType === '融资') {
            return this.repoFees();
        }
        else if (dealType === '融券') {
            return this.shortSellFees();
        }
        return {};
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

        if (dealType === '融资') {
            return (ulMarketValue + ulDividendValue + totalMargin) / nominalValue;
        }
        else if (dealType === '融券') {
            return totalMargin / ulMarketValue;
        }
        return NaN;
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
