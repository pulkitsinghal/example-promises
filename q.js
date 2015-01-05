var willThrowRuntimeError = function() {
  null.f();
};

var q = require('q');
var promisifyTimeout = function(number){
  var deferred = q.defer();
  setTimeout(function() {
    number++;
    if (Math.random() >= 0.5) {
      willThrowRuntimeError();
    }
    console.log(number);
    return deferred.resolve(number);
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
  .catch(function (error) {
    console.log('Houston we have a problem ', error);  // in care of TypeError, this does NOT get called!!! Why?
  })
  .done(); // https://github.com/kriskowal/q#the-end