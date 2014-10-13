'use strict';
import Ember from 'ember';

/* global IassetENV */
export default Ember.ObjectController.extend({
    needs: ['user', 'login'],

    userDisplayName: function() {
        // var session = IassetENV.session;
        // console.log('session', IassetENV.session);
        if (IassetENV.session) {
            var user = session.get('user');
            var displayName = user.get('displayName');
            if (!displayName || displayName === "") {
                displayName = user.get('username');
            }
            return displayName;
        }
        return '';
    }.property(),

    actions: {
    },
});
