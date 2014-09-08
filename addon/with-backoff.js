import retryWithBackoff from './retry-with-backoff';

export default function(context, method) {
  var args = Array.prototype.slice.call(arguments, 2);
  var callback = context[method];
  return retryWithBackoff(function() {
    return callback.apply(context, args);
  });
}
