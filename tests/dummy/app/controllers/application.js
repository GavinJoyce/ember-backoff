import Em from 'ember';
import retryWithBackoff from 'ember-backoff/retry-with-backoff';
import exponential from 'ember-backoff/strategy/exponential';
import linear from 'ember-backoff/strategy/linear';
import constant from 'ember-backoff/strategy/constant';

var strategyNames = ['exponential', 'linear', 'constant'];

export default Em.Controller.extend({
  selectedStrategy: 'exponential',
  strategies: Em.computed('selectedStrategy', function() {
    var selectedStrategy = this.get('selectedStrategy');
    return strategyNames.map(
      name => ({name, selected: (name === selectedStrategy)})
    );
  }),
  selectedStrategyFn: Em.computed('selectedStrategy', function() {
    switch (this.get('selectedStrategy')) {
      case 'constant':
        return constant;
      case 'linear':
        return linear;
      default:
        return exponential;
    }
  }),
  init: function() {
    this.set('content', Em.A());
  },
  actions: {
    flakeyPromiseWithBackoff: function() {
      var self = this;
      this.set('isLoading', true);

      retryWithBackoff(function() {
        return self.flakeyPromise();
      }, 10,  20, this.get('selectedStrategyFn')).then(function() {
        self.set('isLoading', false);
      }, function() {
        self.get('content').pushObject('[retry failed after 10 tries]');
        self.set('isLoading', false);
      });
    },
    setStrategy: function(strategy) {
      this.set('selectedStrategy', strategy);
    }
  },
  flakeyPromise: function() {
    var self = this;

    return new Em.RSVP.Promise(function(resolve, reject) {
      if(Math.random() <= 0.80) {
        self.get('content').pushObject('[failed]');
        reject(); //will fail 80%
      } else {
        self.get('content').pushObject('[succeeded]');
        resolve(); //will succeed 20%
      }
    });
  },
});
