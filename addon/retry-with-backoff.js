import Em from 'ember';
import delay from 'ember-delay/delay';

var retryWithBackoff = function(callback, retryCountBeforeFailure, waitInMilliseconds, resolve, reject) {
  callback(reject).then(resolve).catch(function(reason) {
    if (retryCountBeforeFailure-- > 1) {
      waitInMilliseconds = waitInMilliseconds * 2;

      return delay(waitInMilliseconds).then(function() {
        return retryWithBackoff(
          callback, 
          retryCountBeforeFailure, 
          waitInMilliseconds, 
          resolve, 
          reject
        );
      });
    }

    reject(reason);
  });
};

export default function(callback, retryCountBeforeFailure, waitInMilliseconds){
  if(Em.isEmpty(retryCountBeforeFailure)) {
    retryCountBeforeFailure = 5;
  }
  waitInMilliseconds = waitInMilliseconds || 250;
  
  return new Em.RSVP.Promise(function(resolve, reject) {
    retryWithBackoff(
      callback, 
      retryCountBeforeFailure, 
      waitInMilliseconds, 
      resolve, 
      reject
    );
  });
};
