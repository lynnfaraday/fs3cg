import DS from 'ember-data';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  charName: attr('string'),
  theme: DS.attr('string'),
    brawn: DS.attr('int')
});

