'use strict';
import Ember from 'ember';

export default Ember.ArrayController.extend({
    selectedId: null,
    isEditing: false,
    editingClient: null,

    editButtonsStyle: function() {
        var isEditing = this.get('isEditing');
        return isEditing ? 'display: none' : 'display: block';
    }.property('isEditing'),

    editFormStyle: function() {
        var isEditing = this.get('isEditing');
        return isEditing ? 'display: block' : 'display: none';
    }.property('isEditing'),

    disableEditAndRemove: function() {
        return this.get('selectedId') === null;
    }.property('selectedId'),

    actions: {
        create: function() {
            this.set('isEditing', true);
            var client = this.store.createRecord('client', { });
            console.log(client);
            this.set('editingClient', client);
            this.set('selectedId', client.get('id'));
            client.set('name', '新客户' + client.get('id'));
        },

        edit: function() {
            var clientId = this.get('selectedId');
            var self = this;
            if (clientId) {
                this.set('isEditing', true);
                this.store.find('client', clientId).then(function(client) {
                    self.set('editingClient', client);
                });
            }
        },
        
        remove: function() {
            var self = this;
            if (window.confirm('删除该客户资料？')) {
                var clientId = this.get('selectedId');
                if (clientId) {
                    this.store.find('client', clientId).then(function(client) {
                        client.destroyRecord();
                        self.set('selectedId', null);
                        self.set('editingClient', null);
                    });
                }
            }
        },

        acceptChanges: function() {
            var self = this;
            this.set('isEditing', false);
            var onSuccess = function(client) {
                console.log('save success.');
            };
            var onFail = function(client) {
                console.log('save failed.');
                self.get('editingClient').rollback();
            };
            this.get('editingClient').save().then(onSuccess, onFail);
        },

        cancel: function() {
            var self = this;
            this.set('isEditing', false);
            var client = this.get('editingClient');
            if (client.get('isNew')) {
                self.set('selectedId', null);
                self.set('editingClient', null);
            }
            client.rollback();
        },
    }
});
