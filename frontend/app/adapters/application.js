'use strict';
import DS from 'ember-data';
import ENV from 'iasset/config/environment';

var IAssetAdapter = DS.RESTAdapter.extend({
    host: ENV.APP.API_HOST,
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
