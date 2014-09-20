import DS from 'ember-data';

var Deal = DS.Model.extend({
     
});

Deal.reopenClass({
    FIXTURES: [
        {
            id: 'deal1',
        },
    ]
});

export default Deal;
