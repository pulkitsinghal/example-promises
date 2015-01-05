var willThrowRuntimeError = function() {
  null.f();
};

var Promise = require("bluebird");

var promisifyTimeout = function(number){
  var deferred = Promise.pending();
  setTimeout(function(){
    number++;
    if (Math.random() >= 0.5) {
      willThrowRuntimeError();
    }
    console.log(number);
    deferred.fulfill();
  }, 2000);
  return deferred.promise;
};

var number = 0;
promisifyTimeout(number)
  .then(function(number){
    return promisifyTimeout(number);
  })
  .then(function(number){
    return promisifyTimeout(number);
  })
  .then(function(number){
    console.log('done: ', number);
  })
  .catch(TypeError, function (error) {
    console.log('Houston we have a problem ', error); // in care of TypeError, this does NOT get called!!! Why?
  })
  .catch(function (error) {
    console.log('Houston we have a problem ', error); // in care of TypeError, this does NOT get called!!! Why?
  })
  .error(function (error) {
    /* Note: If a promisified function errbacks the node-style callback with an error,
     *       that could be caught with .error()
     *       However if the node-style callback throws an error, only .catch would catch that.
     */
    console.log('Houston we have a problem ', error); // wasn't supposed to get called, so works as expected.
  });
  //.done(); // https://github.com/petkaantonov/bluebird/blob/master/API.md#donefunction-fulfilledhandler--function-rejectedhandler----void