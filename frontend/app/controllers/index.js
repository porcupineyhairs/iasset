'use strict';
import Ember from 'ember';

/* global ic */
var ajax = ic.ajax;

export default Ember.Controller.extend({
    needs: ['user'],
    loginFailed: false,
    isProcessing: false,

    actions: {
        login: function() {
            var self = this;
            this.setProperties({
                loginFailed: false,
                isProcessing: true
            });
            var userController = this.get('controllers.user');
            var users = userController.store.find('user');
            users.then(function(u) {
                var user = u.content[0];
                var stored_password = user.get('password');
                if (window.md5(self.get('password')) == stored_password) {
                    self.loginSuccess(user);
                }
                else {
                    self.loginFailed();
                }
            });

            /*
            var request = ajax.request('/login/' + this.get('username') + '/' + this.get('password'));
            request.then(this.success.bind(this), this.failure.bind(this));
            */
        },
    },

    loginSuccess: function(user) {
        console.log('login success');
        var userController = this.get('controllers.user');
        userController.set('username', user.get('username'));
        userController.set('displayName', user.get('username'));
    },

    // success for the login request, not login itself
    success: function(data) {
        console.log('data:', data);
        if (data['status'] === 'login') {
            this.set('loginFailed', false);
            console.log('success');
            var userData = JSON.parse(data);
            var user = this.get('controllers.user');
            user.set('username', userData.username);
            user.set('role', userData.role);
        }
        else {
            this.set('loginFailed', true);
            this.set('username', '');
        }
    },

    failure: function() {
    },
});
