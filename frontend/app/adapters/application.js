'use strict';
import DS from 'ember-data';

var IAssetAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:8080',
    // host: document.location.host,
    namespace: 'api/v1',
});

export default IAssetAdapter;

/*
// fixture data for testing
export default DS.FixtureAdapter.extend({
    queryFixtures: function(fixtureData) {
        return [fixtureData[0]];
    },
});
*/
