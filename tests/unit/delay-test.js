import delay from 'ember-backoff/delay';
import { test } from 'ember-qunit';

module('delay');

asyncTest('it returns a promise which resolves', function() {
  expect(1);

  delay(100).then(function() {
    ok(true);
    start();
  });
});

//TODO: GJ: use sinon to mock time and ensure that the promise is resolved at the correct time
