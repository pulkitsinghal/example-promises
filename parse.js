var willThrowRuntimeError = function() {
  null.f();
};

var Parse = require('parse').Parse;
Parse.initialize(
  'parseAppId',
  'parseJsKey',
  'parseMasterKey'
);

var promisifyTimeout = function(number){
  var myPromise = new Parse.Promise();
  setTimeout(function() {
    number++;
    if (Math.random() >= 0.5) {
      willThrowRuntimeError();
    }
    console.log(number);
    return myPromise.resolve(number);
  }, 2000);
  return myPromise;
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
  },
  function(error){
    console.log("Houston we have a problem");  // in care of TypeError, this does NOT get called!!! Why?
  });

/*var number = 0;
parsePromisifyTimeout(number)
  .then(function(number){
    return parsePromisifyTimeout(number)
      .then(function(number){
        return parsePromisifyTimeout(number)
          .then(function(number){
            return parsePromisifyTimeout(number)
              .then(function(number){
                willThrowRuntimeError();
                return parsePromisifyTimeout(number);
              },
              function(error){
                console.log('Houston we have a problem ', error);
              });
          });
      },
      function(error){
        console.log('Houston we have a problem ', error);
      });
  })
  .then(function(number){
    console.log('done: ', number);
  },
  function(error){
    console.log('Houston we have a problem ', error);
  });
*/