import Ember from 'ember';

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

export default Ember.Controller.extend({
    
    themes: [ '100', 'Battlestar Galactica', 'Modern Post-Apocalyptic'],
    charName: 'Test',
    fs3attrs: [],
    fs3action: null,
    selectedTheme: '100',
    attrErrors: [],
    skillErrors: [],
    langskills: [],
    bgskills: [],
    
    init: function() {
        this.notifications.setDefaultAutoClear(true);
        this.resetSkills();
    },
    
    resetSkills: function() {
        let bg = [
            Ember.Object.create( { name: "Describe a hobby, interest or professional background skill." })
        ];
        this.set('bgskills', bg);
        
        let lang = [
            Ember.Object.create( { name: "English" })
        ];
        this.set('langskills', lang);
        
        let attrs = [
            Ember.Object.create( { name: "Brawn", desc: "Physical strength and toughness.", rating: 2, ratingName: 'Average' }),
            Ember.Object.create( { name: "Perception", desc: "Noticing things and being aware of your surroundings.", rating: 2, ratingName: 'Average' }),
            Ember.Object.create( { name: "Composure", desc: "Cooless under pressure. Willpower..", rating: 2, ratingName: 'Average' }),
            Ember.Object.create( { name: "Reflexes", desc: "Reflexes, dexterity, and hand-eye coordination.", rating: 2, ratingName: 'Average' }),
            Ember.Object.create( { name: "Wits", desc: "Practical intelligence, inventiveness and creativity.", rating: 2, ratingName: 'Average' }),
            Ember.Object.create( { name: "Presence", desc: "Poise and charisma.", rating: 2, ratingName: 'Average' }),
        ];
        this.set('fs3attrs', attrs);
        
        let skills = [];
        if (this.get('selectedTheme') === "100") {
            skills = [
            Ember.Object.create( { name: "Archery", desc: "Shooting bows and crossbows. (Reflexes)" }),
            Ember.Object.create( { name: "Athletics", desc: "General running, jumping, climbing, etc. (Brawn)" }),
            Ember.Object.create( { name: "Deception", desc: "Lies and cons. (Presence)" }),
            Ember.Object.create( { name: "Firearms", desc: "Shooting guns. (Reflexes)" }),
            Ember.Object.create( { name: "Medicine", desc: "Tending to the ill and injured. (Wits)" }),
            Ember.Object.create( { name: "Melee", desc: "Fighting with fists, knives, and hand-to-hand weapons. (Brawn)" }),
            Ember.Object.create( { name: "Persuasion", desc: "Making friends and influencing people. (Presence)" }),
            Ember.Object.create( { name: "Riding", desc: "Riding horses. (Brawn)" }),
            Ember.Object.create( { name: "Scrounge", desc: "Knowing where to look to find useful stuff in the ruins. (Wits)" }),
            Ember.Object.create( { name: "Stealth", desc: "Being sneaky. (Reflexes)" }),
            Ember.Object.create( { name: "Survival", desc: "Surviving in the wilderness, including trapping/foraging/shelters/navigation. (Wits)" }),
            Ember.Object.create( { name: "Tactics", desc: "Warfare and tactics. (Wits)" }),
            Ember.Object.create( { name: "Tinkering", desc: "Mechanical/electrical tinkering and repair. (Wits)" }),
            Ember.Object.create( { name: "Thrown", desc: "Thrown weapons. (Reflexes)" }),
            ];
        }
        else if (this.get('selectedTheme') === "Battlestar Galactica") {
            
            skills = [
            Ember.Object.create( { name: "Athletics", desc: "General running, jumping, climbing, etc. (Brawn)" }),
            Ember.Object.create( { name: "Demolitions", desc: "Blowing stuff up. (Wits)" }),
            Ember.Object.create( { name: "Firearms", desc: "Shooting guns. (Reflexes)" }),
            Ember.Object.create( { name: "Medicine", desc: "Tending to the ill and injured. (Wits)" }),
            Ember.Object.create( { name: "Gunnery", desc: "Vehicle and heavy weapons. (Reflexes)" }),
            Ember.Object.create( { name: "Melee", desc: "Fighting with fists, knives, and hand-to-hand weapons. (Brawn)" }),
            Ember.Object.create( { name: "Piloting", desc: "Flying Vipers, Raptors and airborne vehicles. (Reflexes)" }),
            Ember.Object.create( { name: "Stealth", desc: "Being sneaky. (Reflexes)" }),
            Ember.Object.create( { name: "Tinkering", desc: "Mechanical/electrical tinkering and repair. (Wits)" })
            ];           
        }
        else {
            skills = [
            Ember.Object.create( { name: "Archery", desc: "Shooting bows and crossbows. (Reflexes)" }),
            Ember.Object.create( { name: "Athletics", desc: "General running, jumping, climbing, etc. (Brawn)" }),
            Ember.Object.create( { name: "Demolitions", desc: "Blowing stuff up. (Wits)" }),
            Ember.Object.create( { name: "Firearms", desc: "Shooting guns. (Reflexes)" }),
            Ember.Object.create( { name: "Gunnery", desc: "Vehicle and heavy weapons. (Reflexes)" }),
            Ember.Object.create( { name: "Medicine", desc: "Tending to the ill and injured. (Wits)" }),
            Ember.Object.create( { name: "Melee", desc: "Fighting with fists, knives, and hand-to-hand weapons. (Brawn)" }),
            Ember.Object.create( { name: "Riding", desc: "Riding horses. (Brawn)" }),
            Ember.Object.create( { name: "Scrounge", desc: "Knowing where to look to find useful stuff in the ruins. (Wits)" }),
            Ember.Object.create( { name: "Stealth", desc: "Being sneaky. (Reflexes)" }),
            Ember.Object.create( { name: "Survival", desc: "Surviving in the wilderness, including trapping/foraging/shelters/navigation. (Wits)" }),
            Ember.Object.create( { name: "Tinkering", desc: "Mechanical/electrical tinkering and repair. (Wits)" })
            ];
        }
        
        skills.forEach(function (skill) {
            skill.set('rating', 1);
            skill.set('ratingName', 'Everyman');
        });
        
            Ember.Object.create({ archery: 1, athletics: 1, firearms: 1, medicine: 1, melee: 1, tinkering: 1, stealth: 1, thrown: 1, gunnery: 1, piloting: 1, demolitions: 1, deception: 1, persuasion: 1, riding: 1, survival: 1, tactics: 1, scrounge: 1});
        this.set('fs3action', skills);
    }.observes('selectedTheme'),
    
    showAttrErrors: function() {
        if (this.get('attrErrors').length > 0) {
            return true;
        }
        return false;
    }.property('attrErrors'),

    showSkillErrors: function() {
        if (this.get('skillErrors').length > 0) {
            return true;
        }
        return false;
    }.property('skillErrors'),
        
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
        addBackgroundSkill() {
            this.get('bgskills').pushObject( Ember.Object.create( { name: "" }) );  
        },
        addLanguage() {
            this.get('langskills').pushObject( Ember.Object.create( { name: "" }) );  
        },
        validateChar() {
            this.set('attrErrors', []);
            this.set('skillErrors', []);
            
            let highAttrs = this.countHigh(this.get('fs3attrs'), 5);
            let highSkills = this.countHigh(this.get('fs3action'), 5);
            
            if (highAttrs > 1)
            {
                //this.notifications.error('You can only have one attribute at 5.');
                this.attrErrors.push('You can only have one attribute at 5.  If you think this limit is bad, please note it in the comments.');
            }
            
            if (highSkills > 3)
            {
                this.skillErrors.push('You can only have 3 skills at 5+.  If you think this limit is bad, please note it in the comments.');
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
