'use strict';
import Ember from 'ember';

export default Ember.ArrayController.extend({
    i18n: {
        done: '完成',
        clear: '清除',
        today: '今天',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    dateFormat: 'YYYY-MM-DD',
    dealTypes: ['融资', '融券'],
    clientNames: [],

    needs: ['deals'],
    selectedId: null,
    isEditing: false,
    isCalcFee: false,
    editingMode: '',
    editingObj: null,
    value1: 'abc',

    editButtonsStyle: function() {
        return (this.get('isEditing') || this.get('isCalcFee')) ? 'display: none' : 'display: block';
    }.property('isEditing', 'isCalcFee'),

    editFormStyle: function() {
        return this.get('isEditing') ? 'display: block' : 'display: none';
    }.property('isEditing'),

    feeFormStyle: function() {
        return this.get('isCalcFee') ? 'display: block' : 'display: none';
    }.property('isCalcFee'),

    editFormTitle: function() {
    }.property(),

    disableEditAndRemove: function() {
        return this.get('selectedId') === null;
    }.property('selectedId'),

    actions: {
        create: function() {
            this.set('isEditing', true);
            var deal = this.store.createRecord('deal', { });
            console.log(deal);
            this.set('editingObj', deal);
            this.set('selectedId', deal.get('id'));
            deal.set('name', '新交易' + deal.get('id'));
            deal.set('dealDate', new moment().format('YYYY-MM-DD'));
        },

        edit: function() {
            var dealId = this.get('selectedId');
            var self = this;
            if (dealId) {
                this.set('isEditing', true);
                this.set('isCalcFee', false);
                this.store.find('deal', dealId).then(function(deal) {
                    self.set('editingObj', deal);
                });
            }
        },

        calcFee: function() {
            var dealId = this.get('selectedId');
            var self = this;
            if (dealId) {
                this.set('isEditing', false);
                this.set('isCalcFee', true);
                this.store.find('deal', dealId).then(function(deal) {
                    self.set('editingObj', deal);
                });
            }
        },

        editFee: function() {
        },
        
        acceptChanges: function() {
            var self = this;
            this.set('isEditing', false);
            this.set('isCalcFee', false);
            var onSuccess = function(deal) {
                console.log('save success.');
            };
            var onFail = function(deal) {
                console.log('save failed.');
                self.get('editingObj').rollback();
            };
            this.get('editingObj').save().then(onSuccess, onFail);
        },

        cancel: function() {
            console.log('.............. cancel...............');
            var self = this;
            this.set('isEditing', false);
            this.set('isCalcFee', false);
            var deal = this.get('editingObj');
            if (deal.get('isNew')) {
                self.set('selectedId', null);
                self.set('editingObj', null);
            }
            deal.rollback();
        },

    },
});
