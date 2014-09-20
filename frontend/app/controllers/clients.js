'use strict';
import Ember from 'ember';

export default Ember.ArrayController.extend({
    selectedId: null,
    isEditing: false,
    editingClient: null,

    actions: {
        create: function() {
            this.set('isEditing', true);
            var client = this.store.createRecord('client', { });
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
            if (window.confirm('删除该客户资料？')) {
                var clientId = this.get('selectedId');
                if (clientId) {
                    this.store.find('client', clientId).then(function(client) {
                        client.destroyRecord();
                        this.set('selectedId', null);
                        this.set('editingClient', null);
                    });
                }
            }
        },

        acceptChanges: function() {
            this.set('isEditing', false);
            this.get('model').save();
        },

        cancel: function() {
            var self = this;
            this.set('isEditing', false);
            var clientId = this.get('selectedId');
            // TODO there is a bug here, after some cancel, the button may be wrongly disabled
            if (clientId) {
                this.store.find('client', clientId).then(function(client) {
                    if (client.get('isNew')) {
                        self.set('selectedId', null);
                        self.set('editingClient', null);
                    }
                    client.rollback();
                });
            }
        },
    }
});
