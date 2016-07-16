import Ember from 'ember';

export default Ember.Component.extend({
    minRating: 1,
    maxRating: 5,
    
    ratingDescription: function() {
        let name = "";
        
        switch (this.rating) {
            case 1:
                name = "Poor";
                break;
            case 2:
                name = "Average";
                break;
            case 3:
                name =  "Good";
                break;
            case 4:
                name =  "Great";
                break;
            case 5:
                name =  "Exceptional";
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
