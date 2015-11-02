import Em from 'ember';
import retryWithBackoff from 'ember-backoff/retry-with-backoff';
import { test } from 'ember-qunit';

test('it returns a promise which resolves', function(assert) {
  assert.expect(1);

  //TODO: GJ: better tests with sinon
  var count = 0;
  return retryWithBackoff(function() {
    return new Em.RSVP.Promise(function(resolve, reject) {
      count++;
      if(count < 2) {
        reject();
      } else {
        resolve();
      }
    });
  }).then(function() {
    assert.ok(true);
  });
});
