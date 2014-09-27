import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr('string'),
    password: DS.attr('string'),
    displayName: DS.attr('string'),
    role: DS.attr('string'),
    profile: DS.attr('string'),
    settings: DS.attr('string'),
});

