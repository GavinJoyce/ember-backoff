import retryWithBackoff from 'ember-backoff/retry-with-backoff';
import Em from 'ember';
import { test } from 'ember-qunit';

module('retry-with-backoff');

asyncTest('it returns a promise which resolves', function() {
  expect(1);

  //TODO: GJ: better tests with sinon
  var count = 0;
  retryWithBackoff(function() {
    return new Em.RSVP.Promise(function(resolve, reject) {
      count++;
      if(count < 2) {
        reject();
      } else {
        resolve();
      }
    });
  }).then(function() {
    ok(true);
    start();
  });
});
