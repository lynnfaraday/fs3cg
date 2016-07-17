import Ember from 'ember';

export default Ember.Component.extend({
    minRating: 0,
    maxRating: 8,
    
    getRatingName: function() {
        let name = "";
        
        switch (this.rating) {
            case 0:
                name = "Unskilled";
                break;
            case 1:
                name = "Everyman / Average";
                break;
            case 2:
                name =  "Amateur / Mediocre";
                break;
            case 3:
                name =  "Rookie / Fair";
                break;
            case 4:
                name =  "Professional / Good";
                break;
            case 5:
                name = "Veteran / Great";
                break;
            case 6:
                name = "Expert / Superb";
                break;
            case 7:
                name = "Elite / Exceptional";
                break;
            case 8:
                name = "Legend / Legendary";
                break;
        }
        return name;
    },
    
    actions: { 
        increment() {
            var current = this.get('rating');
            if (current < this.get('maxRating')) {
                this.set('rating',  current + 1);
            }
            this.set('ratingName', this.getRatingName());
            this.sendAction('updated');
        },
    
        decrement() {
            var current = this.get('rating');
            if (current > this.get('minRating')) {
                this.set('rating',  current - 1);
            }
            this.set('ratingName', this.getRatingName());
            this.sendAction('updated');
        }
    }
});
