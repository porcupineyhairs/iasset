'use strict';
import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

/* global IassetENV */
export default Ember.Controller.extend(LoginControllerMixin, {
    needs: ['user'],
    authenticator: 'authenticator:custom',
    showLoginFailed: false,

    actions: {
        login: function() {
            this.setProperties({ showLoginFailed: false });
            var loginInfo = this.getProperties('username', 'password');
            var session = this.get('session');
            IassetENV.session = session;

            var self = this;
            this.get('controllers.user').store.find('User', { username: loginInfo.username }).then(
                function(userModel) {
                    if (userModel.content.length > 0) {
                        var user = userModel.content[0];
                        if (window.md5(loginInfo.password) === user.get('password')) {
                            self.loginSuccess(user);
                            return;
                        }
                    }
                    self.loginFailed();
                });
        },
    },

    loginSuccess: function(user) {
        this.setProperties({ showLoginFailed: false });
        var session = this.get('session');
        session.set('user', user);
        session.authenticate('authenticator:custom', true);
    },

    loginFailed: function() {
        this.setProperties({ showLoginFailed: true });
        var session = this.get('session');
        session.authenticate('authenticator:custom', false);
    },

});
