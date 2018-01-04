import constant from 'ember-backoff/strategy/constant';
import { test } from 'ember-qunit';

test('it returns the initial backoff for each successive retry', function(assert) {
  assert.expect(4);
  var expectedBackoff = 1;
  for (var retryCount=0; retryCount<4; retryCount++) {
    assert.equal(constant(1, retryCount), expectedBackoff);
  }
});
