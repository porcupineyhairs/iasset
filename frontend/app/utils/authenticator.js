'use strict';
import AuthenticatorBase from 'simple-auth/authenticators/base';

export default AuthenticatorBase.extend({
    authenticate: function(succeeded) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (succeeded) { resolve(); } else { reject(); }
        });
    },

    invalidate: function(data) {
        return new Ember.RSVP.resolve();
    }
});


