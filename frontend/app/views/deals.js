import Ember from 'ember';

export default Ember.View.extend({
    disableEditAndRemove: function() {
        var clientSelected = this.get('controller.selectedId');
        return clientSelected == null;
    }.property('controller.selectedId'),
});
