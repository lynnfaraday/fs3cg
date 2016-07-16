import Ember from 'ember';

export default Ember.Component.extend({
    minRating: 1,
    maxRating: 5,
    
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
