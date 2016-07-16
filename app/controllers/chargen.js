import Ember from 'ember';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default Ember.Controller.extend({
    
    themes: [ '100', 'Battlestar Galactica', 'Modern Post-Apocalyptic'],
    charName: 'Test',
    fs3attrs: Ember.Object.create({ brawn: 2, perception: 2, composure: 2, wits: 2, reflexes: 2, presence: 2 }),
    fs3action: null,
    selectedTheme: '100',
    attrErrors: [],
    
    init: function() {
        this.notifications.setDefaultAutoClear(true);
        this.resetSkills();
    },
    
    resetSkills: function() {
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
    
    attrPoints: function() {
        let totalAttrs = 0;
        let fa = this.get('fs3attrs');
        
        Object.keys(fa).forEach(function (key) {
            let rating = fa[key];
            if (rating > 2) {
                totalAttrs = totalAttrs + rating - 2;
            } 
             });
             return totalAttrs;
    },
    
    showAttrErrors: function() {
        if (this.get('attrErrors').length > 0) {
            return true;
        }
        return false;
    }.property('attrErrors'),
    
    printAttrs: function() {
        let fa = this.get('fs3attrs');
        let list = [];
        Object.keys(fa).forEach(function (key) {
            list.push( { name: key.capitalizeFirstLetter(), rating: fa[key] });
        });
        console.log(list);
        return list;
    }.property('fs3attrs'),
    
    actions: {
        validateChar() {
            this.set('attrErrors', []);
            this.set('skillErrors', []);
            
            let fa = this.get('fs3attrs');
            let highAttrs = 0;
            Object.keys(fa).forEach(function (key) {
                let rating = fa[key];
                if (rating === 5) {
                    highAttrs = highAttrs + 1;
                }                
            });
            
            if (highAttrs > 1)
            {
                //this.notifications.error('You can only have one attribute at 5.');
                this.attrErrors.push('You can only have one attribute at 5.');
            }
            
            let totalAttrs = this.attrPoints();
            
            if (totalAttrs * 2 > 12)
            {
                //this.notifications.error('You have too many attribute points.');
                this.attrErrors.push('You have too many points in attributes.');
            }
        }
    }
});
