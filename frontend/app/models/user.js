import DS from 'ember-data';

var User = DS.Model.extend({
    username: DS.attr('string'),
    password: DS.attr('string'),
    displayName: DS.attr('string'),
    role: DS.attr('string'),
    profile: DS.attr('string'),
    settings: DS.attr('string'),
});

User.reopenClass({
    FIXTURES: [
        {
            id: '1',
            username: 'ralph',
            password: '202cb962ac59075b964b07152d234b70',
            displayName: 'Ralph Zhang',
            role: 'admin',
            profile: '',
            settings: '',
        },
    ]
});

export default User;
