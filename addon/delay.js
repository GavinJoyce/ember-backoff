import Em from 'ember';

export default function(milliseconds) {
  milliseconds = milliseconds || 2000;
  return new Em.RSVP.Promise(function(resolve) {
    Em.run.later(this, function() {
      resolve();
    }, milliseconds);
  });
}
