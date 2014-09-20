import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    //host: 'http://localhost:5000',
    namespace: '',

    findAll: function(store, type, id) {
        return this.ajax("http://localhost:5000/clients", "GET", {
            crossDomain: true,
            xhrFields: { withCredentials: false }
        }).then(function(json) {
            console.log(json._items);
            return { clients: json._items };
        });
    },
});

/*
// fixture data for testing
export default DS.FixtureAdapter.extend({
});
*/

