'use strict';
import Ember from 'ember';

export default Ember.ObjectController.extend({
    needs: ['user'],

    userDisplayName: function() {
        var user = this.get('controllers.user');
        var displayName = user.get('displayName');
        if (!displayName || displayName === "") {
            displayName = user.get('username');
        }
        return displayName;
    }.property(),
});
