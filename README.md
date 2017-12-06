# ember-backoff

[![Build Status](https://travis-ci.org/GavinJoyce/ember-backoff.svg)](https://travis-ci.org/GavinJoyce/ember-backoff)

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

Or using one of the supplied strategies

```javascript

import retryWithBackoff from 'ember-backoff/retry-with-backoff';
import constant from 'ember-backoff/strategy/constant';

export default Em.Route.extend({
  model: function(params) {
    retryWithBackoff(function() {
      // poll until record exists
      return this.store.find('completedJob', 22);
    }, 10, 1000, constant); //retry 10 times: always 1s between tries
  }
});

```

Or you own custom strategy

```javascript

import retryWithBackoff from 'ember-backoff/retry-with-backoff';
import exponential from 'ember-backoff/strategy/exponential';

function exponentialWithDither(initialWait, retryCount) {
  var ditherFrac = Math.random() * 10;
  return (1 + ditherFrac) * exponential(initialWait, retryCount);
}

export default Em.Route.extend({
  model: function(params) {
    retryWithBackoff(function() {
      return this.store.query('thunderindHerd');
    }, 10, 1000, exponentialWithDither);
  }
});

```

Questions? Ping me [@gavinjoyce](https://twitter.com/gavinjoyce)

## Installation

`npm install ember-backoff --save`

## Outstanding Tasks

 * [ ] Better tests using sinon
 * [ ] Other strategies: simply retry, fibonacci...
 * [ ] High level support for Ember Data and Ember Model

Pull requests are very welcome, thanks.

## Development Instructions

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

![sample application](https://cloud.githubusercontent.com/assets/2526/4193579/ed8937dc-37a2-11e4-93e6-3b20b53fb315.png)

### Running Tests

* `ember test`
* `ember test --server`
