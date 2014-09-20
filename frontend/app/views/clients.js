'use strict';
import Ember from 'ember';

export default Ember.View.extend({
    editButtonsStyle: function() {
        var isEditing = this.get('controller.isEditing');
        return isEditing ? 'display: none' : 'display: block';
    }.property('controller.isEditing'),

    editFormStyle: function() {
        var isEditing = this.get('controller.isEditing');
        return isEditing ? 'display: block' : 'display: none';
    }.property('controller.isEditing'),

    disableEditAndRemove: function() {
        var clientSelected = this.get('controller.selectedId');
        return clientSelected === null;
    }.property('controller.selectedId'),
});
