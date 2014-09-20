import Ember from 'ember';

export default Ember.ArrayController.extend({
    selectedId: null,
    isEditing: false,
    editingClient: null,

    actions: {
        create: function() {
            this.set("isEditing", true);
            var client = this.store.createRecord('client', { });
            this.set("editingClient", client);
            this.set("selectedId", client.get("id"));
            client.set("name", "新客户" + client.get("id"));
        },

        edit: function() {
            var client_id = this.get("selectedId");
            var self = this;
            if (client_id) {
                this.set("isEditing", true);
                this.store.find('client', client_id).then(function(client) {
                    self.set("editingClient", client);
                });
            }
        },
        
        remove: function() {
            if (confirm("删除该客户资料？")) {
                var client_id = this.get("selectedId");
                if (client_id) {
                    this.store.find('client', client_id).then(function(client) {
                        client.destroyRecord();
                        this.set("selectedId", null);
                        this.set("editingClient", null);
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
            var client_id = this.get("selectedId");
            // TODO there is a bug here, after some cancel, the button may be wrongly disabled
            if (client_id) {
                this.store.find('client', client_id).then(function(client) {
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
