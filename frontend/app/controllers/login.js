'use strict';
import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

/* global IassetENV */
export default Ember.Controller.extend(LoginControllerMixin, {
    needs: ['user'],
    authenticator: 'authenticator:token',
    showLoginFailed: false,
});
