'use strict';
import Ember from 'ember';

/* global IassetENV */
IassetENV.locationType = 'hash';

var Router = Ember.Router.extend({
  location: IassetENV.locationType
});

Router.map(function() {
    this.resource('dashboard', function() {
    });
    this.resource('risk', function() {
    });
    this.resource('clients', function() {
        this.route('new');
        this.route('edit', { path: 'edit/:client_id' });
        this.route('delete');
    });
    this.resource('deals', function() {
        this.route('new');
        this.route('edit', { path: 'edit/:deal_id' });
        this.route('delete');
    });
});

export default Router;
