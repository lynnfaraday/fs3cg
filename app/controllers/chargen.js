import Ember from 'ember';

export default Ember.Controller.extend({
    
    themes: [ '100', 'Battlestar Galactica', 'Modern Post-Apocalyptic'],
    charName: 'Test',
    fs3attrs: Ember.Object.create({ brawn: 1, perception: 1 }),
    
    init: function() {
        this.notifications.setDefaultAutoClear(true);
    },
    
    actions: {
        validateChar() {
            let fa = this.get('fs3attrs');
            this.notifications.error('Something went wrong');
        }
    }
});
