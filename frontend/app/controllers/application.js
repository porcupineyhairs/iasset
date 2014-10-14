'use strict';
import Ember from 'ember';

/* global IassetENV */
export default Ember.ObjectController.extend({
    needs: ['user', 'login'],

    userDisplayName: function() {
        var session = this.get('session');
        if (session) {
            var user = session.get('user');
            console.log(user);
            if (user) {
                var displayName = user.displayName;
                if (!displayName || displayName === "") {
                    displayName = user.username;
                }
                return displayName;
            }
        }
        return '';
    }.property('session.user'),

    actions: {
    },
});
