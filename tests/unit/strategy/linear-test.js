import linear from 'ember-backoff/strategy/linear';
import { test } from 'ember-qunit';

test('it increments the result for each successive retry with an initial backoff of 1', function(assert) {
  assert.expect(4);
  var expectedBackoffs = [1, 2, 3, 4];
  for (var retryCount=0; retryCount<4; retryCount++) {
    assert.equal(linear(1, retryCount), expectedBackoffs[retryCount]);
  }
});
