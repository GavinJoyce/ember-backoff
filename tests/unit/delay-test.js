import delay from 'ember-backoff/delay';
import { module, test } from 'ember-qunit';

module('delay');

test('it returns a promise which resolves', function(assert) {
  assert.expect(1);

  return delay(100).then(() => {
    assert.ok(true);
  });
});
