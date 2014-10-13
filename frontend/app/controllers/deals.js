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
    feesType: 'fees',
    selectedId: null,
    isEditing: false,
    isEditingFees: false,
    isShowingFees: false,
    editingMode: '',
    editingObj: null,
    currentFees: null,
    value1: 'abc',

    editButtonsStyle: function() {
        return (this.get('isEditing') || this.get('isCalcFee')) ? 'display: none' : 'display: block';
    }.property('isEditing', 'isCalcFee'),

    editFormStyle: function() {
        return this.get('isEditing') ? 'display: block' : 'display: none';
    }.property('isEditing'),

    showFeesFormStyle: function() {
        return this.get('isShowingFees') ? 'display: block' : 'display: none';
    }.property('isShowingFees'),

    editFeesFormStyle: function() {
        return this.get('isEditingFees') ? 'display: block' : 'display: none';
    }.property('isEditingFees'),

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
                this.set('isEditingFees', false);
                this.set('isShowingFees', false);
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
                this.set('isEditingFees', true);
                this.set('isShowingFees', false);
                this.store.find('deal', dealId).then(function(deal) {
                    self.set('editingObj', deal);
                });
            }
        },

        editFee: function() {
        },

        showFees: function(fees, dealType, dealId) {
            this.set('isEditing', false);
            this.set('isEditingFees', false);
            this.set('isShowingFees', true);

            this.set('feesType', 'fees/' + dealType);
            this.set('currentFees', fees);
            this.set('selectedId', dealId);
        },

        closeShowFeesForm: function() {
            this.set('isShowingFees', false);
        },
        
        acceptChanges: function() {
            var self = this;
            this.set('isEditing', false);
            this.set('isEditingFees', false);
            this.set('isShowingFees', false);
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
            var self = this;
            this.set('isEditing', false);
            this.set('isEditingFees', false);
            this.set('isShowingFees', false);
            var deal = this.get('editingObj');
            if (deal.get('isNew')) {
                self.set('selectedId', null);
                self.set('editingObj', null);
            }
            deal.rollback();
        },

    },
});
