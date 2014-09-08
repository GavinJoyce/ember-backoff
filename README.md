# Ember-backoff

Simple exponential backoff strategy for Ember.js promises

```javascript

import retryWithBackoff from 'ember-backoff/retry-with-backoff';

export default Em.Route.extend({
  model: function(params) {
    retryWithBackoff(function() {
      return this.store.find('user', 142857); //return any promise here
    }, 5, 100); //retry 5 times: 100ms, 200ms, 400ms, 800ms, 1600ms between tries
  }
});

```

Questions? Ping me [@gavinjoyce](https://twitter.com/gavinjoyce)

## Installation

`npm install ember-backoff`

## Outstanding Tasks

 * [ ] Better tests using sinon
 * [ ] Support for Ember Data and Ember Model

Pull requests are very welcome, thanks.

## Development Instructions

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`
