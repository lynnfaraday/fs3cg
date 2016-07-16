import Ember from 'ember';

export default Ember.Controller.extend({
    
    themes: [ '100', 'Battlestar Galactica', 'Modern Post-Apocalyptic'],
    charName: 'Test',
    fs3attrs: Ember.Object.create({ brawn: 2, perception: 2, composure: 2, wits: 2, reflexes: 2, presence: 2 }),
    
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
