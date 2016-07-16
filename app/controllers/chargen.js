import Ember from 'ember';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default Ember.Controller.extend({
    
    themes: [ '100', 'Battlestar Galactica', 'Modern Post-Apocalyptic'],
    charName: 'Test',
    fs3attrs: [],
    fs3action: null,
    selectedTheme: '100',
    attrErrors: [],
    
    init: function() {
        this.notifications.setDefaultAutoClear(true);
        this.resetSkills();
    },
    
    resetSkills: function() {
        let attrs = [
            Ember.Object.create( { name: "Brawn", desc: "Physical strength and toughness.", rating: 2 }),
            Ember.Object.create( { name: "Perception", desc: "Noticing things and being aware of your surroundings.", rating: 2 }),
            Ember.Object.create( { name: "Composure", desc: "Cooless under pressure. Willpower..", rating: 2 }),
            Ember.Object.create( { name: "Reflexes", desc: "Reflexes, dexterity, and hand-eye coordination.", rating: 2 }),
            Ember.Object.create( { name: "Wits", desc: "Practical intelligence, inventiveness and creativity.", rating: 2 }),
            Ember.Object.create( { name: "Presence", desc: "Poise and charisma.", rating: 2 }),
        ];
        this.set('fs3attrs', attrs);
        
        let skills = Ember.Object.create({ archery: 1, athletics: 1, firearms: 1, medicine: 1, melee: 1, tinkering: 1, stealth: 1, thrown: 1, gunnery: 1, piloting: 1, demolitions: 1, deception: 1, persuasion: 1, riding: 1, survival: 1, tactics: 1, scrounge: 1});
        this.set('fs3action', skills);
    }.observes('selectedTheme'),
    
    showLowTech: function() {
        switch (this.get('selectedTheme')) {
        case '100':
            return true;
        case 'Modern Post-Apocalyptic':
            return true;
        default:
            return false;
        }
    }.property('selectedTheme'),
    
    showHighTech: function() {
        switch (this.get('selectedTheme')) {
        case '100':
            return false;
        default:
            return true;
        }
    }.property('selectedTheme'),

    show100: function() {
        switch (this.get('selectedTheme')) {
        case '100':
            return true;
        default:
            return false;
        }
    }.property('selectedTheme'),

    showAttrErrors: function() {
        if (this.get('attrErrors').length > 0) {
            return true;
        }
        return false;
    }.property('attrErrors'),
    
    attrPoints: function() {
        let totalAttrs = 0;
        let fa = this.get('fs3attrs');
        
        Object.keys(fa).forEach(function (key) {
            let rating = fa[key]['rating'];
            if (rating > 2) {
                totalAttrs = totalAttrs + rating - 2;
            } 
        });
        return totalAttrs;
    },
    
    countHigh: function(stats, highLimit) {     
        let high = 0;
        Object.keys(stats).forEach(function (key) {
            let rating = stats[key]['rating'];
            if (rating >= highLimit) {
                high = high + 1;
            }                
        });
        return high;
    },

    actions: {
        validateChar() {
            this.set('attrErrors', []);
            this.set('skillErrors', []);
            
            let highAttrs = this.countHigh(this.get('fs3attrs'), 5);
            let highSkills = this.countHigh(this.get('fs3attrs'), 5);
            
            if (highAttrs > 1)
            {
                //this.notifications.error('You can only have one attribute at 5.');
                this.attrErrors.push('You can only have one attribute at 5.  If you think this limit is bad, please note it in the comments.');
            }
            
            let totalAttrs = this.attrPoints();
            
            if (totalAttrs * 2 > 12)
            {
                //this.notifications.error('You have too many attribute points.');
                this.attrErrors.push('You have too many points in attributes.  If you think this limit is bad, please note it in the comments.');
            }
        }
    }
});
