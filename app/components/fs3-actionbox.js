import Ember from 'ember';

export default Ember.Component.extend({
    minRating: 0,
    maxRating: 8,
    
    ratingDescription: function() {
        let name = "";
        
        switch (this.rating) {
            case 0:
                name = "Unskilled";
                break;
            case 1:
                name = "Everyman";
                break;
            case 2:
                name =  "Amateur";
                break;
            case 3:
                name =  "Rookie";
                break;
            case 4:
                name =  "Professional";
                break;
            case 5:
                name = "Veteran";
                break;
            case 6:
                name = "Expert";
                break;
            case 7:
                name = "Elite";
                break;
            case 8:
                name = "Legend";
                break;
        }
        return name;
    }.property('rating'),
    
    actions: { 
        increment() {
            var current = this.get('rating');
            if (current < this.get('maxRating')) {
                this.set('rating',  current + 1);
            }
            this.sendAction('updated');
        },
    
        decrement() {
            var current = this.get('rating');
            if (current > this.get('minRating')) {
                this.set('rating',  current - 1);
            }
            this.sendAction('updated');
        }
    }
});
