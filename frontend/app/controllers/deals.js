'use strict';
import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['deals'],
    selectedId: null,
    isEditing: false,
    editingMode: '',
    editingObj: null,
    value1: 'abc',

    editButtonsStyle: function() {
        var isEditing = this.get('isEditing');
        return isEditing ? 'display: none' : 'display: block';
    }.property('isEditing'),

    editFormStyle: function() {
        var isEditing = this.get('isEditing');
        console.log('isediting....', isEditing);
        return isEditing ? 'display: block' : 'display: none';
    }.property('isEditing'),

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
            deal.set('dealDate', '2014-09-22');
        },

        edit: function() {
            var dealId = this.get('selectedId');
            var self = this;
            if (dealId) {
                this.set('isEditing', true);
                this.store.find('deal', dealId).then(function(deal) {
                    self.set('editingObj', deal);
                });
            }
        },
        
        acceptChanges: function() {
            var self = this;
            this.set('isEditing', false);
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
            var deal = this.get('editingObj');
            if (deal.get('isNew')) {
                self.set('selectedId', null);
                self.set('editingObj', null);
            }
            deal.rollback();
        },

    },
});
