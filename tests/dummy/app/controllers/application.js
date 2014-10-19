import Em from 'ember';
import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default Em.ArrayController.extend({
  setup: function() {
    this.set('content', Em.A());
  }.on('init'),
  actions: {
    flakeyPromiseWithBackoff: function() {
      var self = this;
      this.set('isLoading', true);

      retryWithBackoff(function() {
        return self.flakeyPromise();
      }, 20, 10).then(function() {
        self.set('isLoading', false);
      }, function() {
        self.pushObject('[retry failed after 10 tries]');
        self.set('isLoading', false);
      });
    }
  },
  flakeyPromise: function() {
    var self = this;

    return new Em.RSVP.Promise(function(resolve, reject) {
      if(Math.random() <= 0.80) {
        self.pushObject('[failed]');
        reject(); //will fail 80%
      } else {
        self.pushObject('[succeeded]');
        resolve(); //will succeed 20%
      }
    });
  },
});
