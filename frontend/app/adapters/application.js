'use strict';
import DS from 'ember-data';

var EveAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:5000',
    namespace: 'api/v1',
});

/*
EveAdapter.reopen({
    updateRecord: function(store, type, record) {
        console.log(record);
        this.deleteRecord(store, type, record);
        return this.createRecord(store, type, record);
    },

    createRecord: function(store, type, record) {
        var data = {};
        var serializer = store.serializerFor(type.typeKey);
        serializer.serializeIntoHash(data, type, record, {includeId: true});
        console.log('data', data);
        data.deal.dealCode = 'abc';
        return this.ajax('http://localhost:5000/api/v1/deals', 'POST', { data: data.deal });
    },

    // overrides RESTAdapter.ajaxOptions
    ajaxOptions: function(url, type, options) {
        var hash = this._super(url, type, options);
        if (type === 'GET') {
            options.data = {};//{ where: '"username": "ralph"' };
        }
        return hash;
    },

    // overrides RESTAdatper.ajaxSuccess
    ajaxSuccess: function(jqXHR, jsonPayload) {
        console.log('ajaxSuccess', jqXHR, jsonPayload);
        return jsonPayload._items;
    },

    // overrides RESTAdapter.ajaxError
    ajaxError: function(jqXHR, responseText) {
        console.log(jqXHR, responseText);
        return this._super(jqXHR, responseText);
    },

    // overrides RESTAdapter.ajaxOptions
    // ------ For unknown reason, this has to be overridden to get EveAdatper.ajaxSuccess called ------
    // ------ find out why and remove this override (it does nothing but copy the original source -----
    ajax: function(url, type, options) {
        var adapter = this;

        return new Ember.RSVP.Promise(function(resolve, reject) {
            var hash = adapter.ajaxOptions(url, type, options);

            hash.success = function(json, textStatus, jqXHR) {
                json = adapter.ajaxSuccess(jqXHR, json);
                //if (json instanceof InvalidError) { Ember.run(null, reject, json); }
                if (json === null) { Ember.run(null, reject, json); }
                else { Ember.run(null, resolve, json); }
            };

            hash.error = function(jqXHR, textStatus, errorThrown) {
                Ember.run(null, reject, adapter.ajaxError(jqXHR, jqXHR.responseText));
            };

            Ember.$.ajax(hash);
        }, "DS: RESTAdapter#ajax " + type + " to " + url);
    },
}); */

export default EveAdapter;

/*
// fixture data for testing
export default DS.FixtureAdapter.extend({
    queryFixtures: function(fixtureData) {
        return [fixtureData[0]];
    },
});
*/

