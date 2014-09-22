import Ember from 'ember';
import Quotes from 'iasset/utils/quotes';

export default Ember.ArrayController.extend({
    itemController: 'deal',
    selectedId: null,
    isEditing: false,

    actions: {
        create: function() {
        },

        edit: function() {
        },
    },
});
