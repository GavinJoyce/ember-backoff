import exponential from 'ember-backoff/strategy/exponential';
import { test } from 'ember-qunit';

test('it doubles the result for each successive retry with the same initial backoff', function(assert) {
  assert.expect(4);
  var expectedBackoffs = [1, 2, 4, 8];
  for (var retryCount=0; retryCount<4; retryCount++) {
    assert.equal(exponential(1, retryCount), expectedBackoffs[retryCount]);
  }
});
