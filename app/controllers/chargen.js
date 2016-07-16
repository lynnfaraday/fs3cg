import Ember from 'ember';

export default Ember.Controller.extend({
    
    themes: [ '100', 'Battlestar Galactica', 'Modern Post-Apocalyptic'],
    
    init: function() {
        this.notifications.setDefaultAutoClear(true);
    },
    
    actions: {
        validateChar() {
            this.notifications.error('Something went wrong');
        }
    }
});
