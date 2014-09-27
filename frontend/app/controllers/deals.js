'use strict';
import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['deals'],
    selectedId: null,
    isEditing: false,
    editingMode: '',
    editingDeal: null,
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
            console.log('creating deal.....', this.get('selectedId'));
            this.set('isEditing', true);
            this.set('editingMode', 'create');
            var deal = this.store.createRecord('deal', { });
            deal.set('name', 'abc');
            deal.set('dealDate', '2014-09-22');
            this.set('editingDeal', deal);
        },

        edit: function() {
            var dealId = this.get('selectedId');
            var self = this;
            if (dealId) {
                this.set('isEditing', true);
                this.store.find('deal', dealId).then(function(deal) {
                    self.set('editingDeal', deal);
                });
            }
        },
 
        acceptChanges: function() {
            this.set('isEditing', false);
            this.get('model').save();
        },

        cancel: function() {
            var self = this;
            this.set('isEditing', false);
            var dealId = this.get('selectedId');
            // TODO there is a bug here, after some cancel, the button may be wrongly disabled
            if (dealId) {
                this.store.find('deal', dealId).then(function(deal) {
                    if (client.get('isNew')) {
                        self.set('selectedId', null);
                        self.set('editingDeal', null);
                    }
                    deal.rollback();
                });
            }
        },

    },
});
