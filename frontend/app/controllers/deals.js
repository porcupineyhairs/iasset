'use strict';
import Ember from 'ember';

export default Ember.ArrayController.extend({
    needs: ['deals'],
    selectedId: null,
    isEditing: false,
    editingDeal: null,

    editButtonsStyle: function() {
        var isEditing = this.get('isEditing');
        return isEditing ? 'display: none' : 'display: block';
    }.property('isEditing'),

    disableEditAndRemove: function() {
        return this.get('selectedId') === null;
    }.property('selectedId'),

    actions: {
        create: function() {
            console.log('creating deal.....', this.get('selectedId'));
        },

        edit: function() {
        },
    },
});
