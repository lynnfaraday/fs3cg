import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        var m = this.store.createRecord('fs3char', { charName: 'Test', theme: 'Battlestar Galactica', brawn: 1 });
        return m;
    }
});
