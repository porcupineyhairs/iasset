import DS from 'ember-data';

export default DS.Model.extend({
    timestamp: DS.attr('string'),
    statement: DS.attr('string'),
});
