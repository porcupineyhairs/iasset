'use strict';
import Ember from 'ember';

/* global ic */
var ajax = ic.ajax;

export default Ember.Controller.extend({
    loginFailed: false,
    isProcessing: false,

    actions: {
        login: function() {
            this.setProperties({
                loginFailed: false,
                isProcessing: true
            });
            var request = ajax.request('/login/' + this.get('username') + '/' + this.get('password'));
            request.then(this.success.bind(this), this.failure.bind(this));
        },
    },

    // success for the login request, not login itself
    success: function(data) {
        console.log('data:', data);
        if (data['status'] === 'login') {
            this.set('loginFailed', false);
            console.log('success');
        }
        else {
            this.set('loginFailed', true);
            this.set('username', '');
        }
    },

    failure: function() {
    },
});
