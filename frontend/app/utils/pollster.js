'use strict';
import Ember from 'ember';

export default Ember.Object.extend({
    interval: function() {
        return 5000;
    }.property().readOnly(),

    schedule: function(f) {
        return Ember.run.later(this, function() {
            f.apply(this);
            this.set('timer', this.schedule(f));
        }, this.get('interval'));
    },

    stop: function() {
        Ember.run.cancel(this.get('timer'));
    },

    start: function() {
        this.set('timer', this.schedule(this.get('onPoll')));
    },

    onPoll: function() {
    },
});
