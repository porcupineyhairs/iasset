import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['activities'],

    _activities: [],

    // TODO promise-based property update
    activities: function() {
        if (this.get('_activities').length == 0) {
            this.get('controllers.activities').store.findAll('activity').then(function(acts) {
                console.log('act return', acts);
                acts.forEach(function(activity) {
                    activity.set('timeago', jQuery.timeago(activity.get('timestamp')));
                    this.get('_activities').push(activity);
                });
            });
        }
        return this.get('_activities');
    }.property('controllers.activities'),

});
