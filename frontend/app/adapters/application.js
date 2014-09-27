'use strict';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'http://localhost:5000',
    namespace: 'api/v1',
    headers: {
        'Content-Type': 'application/json',
    },

    find: function(store, type, id, record) {
        console.log('finding....', type);
        return this._super(store, type, id, record);
    },

    findAll: function(store, type, id) {
        return this.ajax('http://localhost:5000/api/v1/'+type.typeKey+'s', 'GET', {
            crossDomain: true,
            xhrFields: { withCredentials: false }
        }).then(function(json) {
            //console.log(json._items);
            return { deals: json._items };
        });
    },

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

    ajax: function(url, type, options) {
        console.log('options: ', options);
        return this._super(url, type, options);
    },
});

/*
// fixture data for testing
export default DS.FixtureAdapter.extend({
});
*/
