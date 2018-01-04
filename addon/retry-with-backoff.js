import delay from './delay';
import exponentialStrategy from './strategy/exponential';

function retryWithBackoff(callback, retryCountBeforeFailure, initialWaitInMilliseconds, backoffStrategy) {
  retryCountBeforeFailure = retryCountBeforeFailure || 5;
  initialWaitInMilliseconds = initialWaitInMilliseconds || 250;
  backoffStrategy = backoffStrategy || exponentialStrategy;

  var _retryWithCallback = function(callback, retryCount) {
    return callback().catch(function(reason) {
      if (retryCount < retryCountBeforeFailure) {
        return delay(backoffStrategy(initialWaitInMilliseconds, retryCount)).then(function() {
          return _retryWithCallback(callback, ++retryCount);
        });
      }
      throw reason;
    });
  }
  return _retryWithCallback(callback, 0);
}

export default retryWithBackoff;
