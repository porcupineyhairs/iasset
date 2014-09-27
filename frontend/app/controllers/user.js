import Ember from 'ember';

export default Ember.ObjectController.extend({
    username: 'ralph------',
    role: 'admin',
    profile: '',
    settings: '',

    displayName: function() {
        return this.get('username');
    }.property('username'),
});
