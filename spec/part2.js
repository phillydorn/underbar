(function() {
  'use strict';

  describe('Part II', function() {
    describe('contains', function() {
      it('should return false if a collection does not contain a user-specified value', function() {
        expect(_.contains([4, 5, 6], 2)).to.be.false;
      });

      it('should return true if a collection contains a user-specified value', function() {
        expect(_.contains([4, 5, 6], 5)).to.be.true;
      });

      it('should work on objects', function(){
        expect(_.contains({ a: 4, b: 5, c: 6 }, 5)).to.be.true;
      });
    });

    describe('every', function() {

      _.every = function(collection, iterator) {
       
        var callbacks = true;

        if (arguments.length < 2) {
          callbacks = false;
        }


        if (collection.length === 0) { //returns true for an empty array
            return true;
        }
        else {

          var isEvery =  _.reduce (collection, function (test, item) {
        
          
            if (!test) { // if one element fails, the whole test fails
              return false;
            }
            else {
              if (callbacks) {         // if there is a callback function, 
               return iterator(item); // checks each element for truthiness
              }
              else {            //if there is no callback it just returns the value of each item in the array
                return item;
              }
            }
          },true);
        }
        if (isEvery == false) { // translates truthy and falsy values to booleans
          return false;
        }
        else {
          return true;
        }

      }

      var isEven = function(num) {
        return num % 2 === 0;
      };

      it('passes by default for an empty collection', function() {
        expect(_.every([], _.identity)).to.be.true;
      });

      it('passes for a collection of all-truthy results', function() {
        expect(_.every([true, {}, 1], _.identity)).to.be.true;
      });

      it('fails for a collection of all-falsy results', function() {
        expect(_.every([null, 0, undefined], _.identity)).to.be.false;
      });

      it('fails for a collection containing mixed falsy and truthy results', function() {
        expect(_.every([true, false, 1], _.identity)).to.be.false;
        expect(_.every([1, undefined, true], _.identity)).to.be.false;
      });

      it('should work when provided a collection containing undefined values', function() {
        expect(_.every([undefined, undefined, undefined], _.identity)).to.be.false;
      });

      it('should cast the result to a boolean', function() {
        expect(_.every([1], _.identity)).to.be.true;
        expect(_.every([0], _.identity)).to.be.false;
      });

      it('should handle callbacks that manipulate the input', function() {
        expect(_.every([0, 10, 28], isEven)).to.be.true;
        expect(_.every([0, 11, 28], isEven)).to.be.false;
      });

      it('should work when no callback is provided', function() {
        expect(_.every([true, true, true])).to.be.true;
        expect(_.every([true, true, false])).to.be.false;
        expect(_.every([false, false, false])).to.be.false;
      });
    });

    describe('some', function() {

    _.some = function(collection, iterator) {
      if (arguments.length < 2) { //default iterator if none is specified
        iterator = _.identity;
      }
      var oppFunction = function (item) { return !iterator(item);}; // created a function to give the opposite
                                                                    // of the result of the iterator function
     
      return  !_.every(collection, oppFunction); // then return the opposite of running _.every on that opposite function
                                                  // If all the opposites are not false, then some must be true.


    }


      var isEven = function(number){
        return number % 2 === 0;
      };

      it('should fail by default for an empty collection', function() {
        expect(_.some([])).to.be.false;
      });

      it('should pass for a collection of all-truthy results', function() {
        expect(_.some([true, {}, 1], _.identity)).to.be.true;
      });

      it('should fail for a collection of all-falsy results', function() {
        expect(_.some([null, 0, undefined], _.identity)).to.be.false;
      });

      it('should pass for a collection containing mixed falsy and truthy results', function() {
        expect(_.some([true, false, 1], _.identity)).to.be.true;
      });

      it('should pass for a set containing one truthy value that is a string', function() {
        expect(_.some([null, 0, 'yes', false], _.identity)).to.be.true;
      });
      
      it('should fail for a set containing no matching values', function() {
        expect(_.some([1, 11, 29], isEven)).to.be.false;
      });

      it('should pass for a collection containing one matching value', function() {
        expect(_.some([1, 10, 29], isEven)).to.be.true;
      });

      it('should cast the result to a boolean', function() {
        expect(_.some([1], _.identity)).to.be.true;
        expect(_.some([0], _.identity)).to.be.false;
      });

      it('should work when no callback is provided', function() {
        expect(_.some([true, true, true])).to.be.true;
        expect(_.some([true, true, false])).to.be.true;
        expect(_.some([false, false, false])).to.be.false;
      });
    });

    describe('extend', function() {

      _.extend = function(obj) {
        for (var i = 1; i< arguments.length; i++) { //makes sure to account for multiple sources
          for (var j in arguments[i]) { // runs through each key in each argument
            obj[j] = arguments[i][j]; //adds each key and value to the original object
          
          }
          
          
        }

        return obj;
      }

      it('returns the first argument', function() {
        var to = {};
        var from = {};
        var extended = _.extend(to, from);

        expect(extended).to.equal(to);
      });

      it('should extend an object with the attributes of another', function() {
        var to = {};
        var from = { a: 'b' };
        var extended = _.extend(to, from);

        expect(extended.a).to.equal('b');
      });

      it('should override properties found on the destination', function() {
        var to = { a: 'x' };
        var from = { a: 'b' };
        var extended = _.extend(to, from);

        expect(extended.a).to.equal('b');
      });

      it('should not override properties not found in the source', function() {
        var to = { x: 'x' };
        var from = { a: 'b' };
        var extended = _.extend(to, from);

        expect(extended.x).to.equal('x');
      });

      it('should extend from multiple source objects', function() {
        var extended = _.extend({ x: 1 }, { a: 2 }, { b:3 });

        expect(extended).to.eql({ x: 1, a: 2, b: 3 });
      });

      it('in the case of a conflict, it should use the last property\'s values when extending from multiple source objects', function() {
        var extended = _.extend({ x: 'x' }, { a: 'a', x: 2 }, { a: 1 });

        expect(extended).to.eql({ x: 2, a: 1 });
      });
    });

    describe('defaults', function() {

      _.defaults = function(obj) {
       for (var i = 1; i< arguments.length; i++) { //makes sure to account for multiple sources
          for (var j in arguments[i]) { // runs through each key in each argument
            if (!(j in obj)) { // conditional to make sure the key is not already in the object
            obj[j] = arguments[i][j]; //adds each key and value to the original object
            }

          }
          
          
        }

        return obj;
      }
      it('returns the first argument', function() {
        var to = {};
        var from = {};
        var defaulted = _.defaults(to, from);

        expect(defaulted).to.equal(to);
      });

      it('should copy a property if that key is not already set on the target', function() {
        var to = {};
        var from = { a: 1 };
        var defaulted = _.defaults(to, from);

        expect(defaulted.a).to.equal(1);
      });

      it('should not copy a property if that key is already set on the target', function() {
        var to = { a: 10 };
        var from = { a: 1 };
        var defaulted = _.defaults(to, from);

        expect(defaulted.a).to.equal(10);
      });

      it('should not copy a property if that key is already set on the target, even if the value for that key is falsy', function() {
        var to = {a: '', b: NaN };
        var from = { a: 1, b: 2 };
        var defaulted = _.defaults(to, from);

        expect(defaulted.a).to.equal('');
        expect(isNaN(defaulted.b)).to.be.true;
      });

      it('prefers the first value found when two objects are provided with properties at the same key', function() {
        var to = {};
        var from = { a: 1 };
        var alsoFrom = { a: 2 };
        var defaulted = _.defaults(to, from, alsoFrom);

        expect(defaulted.a).to.equal(1);
      });
    });

    describe('once', function() {
      it('should only run a user-defined function if it hasn\'t been run before', function() {
        var num = 0;
        var increment = _.once(function() {
          num += 1;
        });

        increment();
        increment();

        expect(num).to.equal(1);
      });
    });

    describe('memoize', function() {

      _.memoize = function (func) {
        
        var calledArguments = {}; // creates an object to keep track of which arguments the function has been called on
     


        return function () {

          var args = Array.prototype.slice.call(arguments); // converts the "arguments" object to an array
          var result;

          if (!(args in calledArguments)) { 
            
           
            result = func.apply(this, arguments); // if the function hasn't been called on the current array of
            calledArguments[args] = result;       // arguments yet, it calls it and then adds those arguments as
            return result;                      // keys to the object with the result as its value
          }
          
          else{

            return calledArguments[args]; // if it has already been called it just returns the previous value
          }

            

        }

      }
      
      var add, memoAdd;

      beforeEach(function() {
        add = function(a, b) {
          return a + b;
        };

        memoAdd = _.memoize(add);
      });

      it('should produce the same result as the non-memoized version', function() {
        expect(add(1, 2)).to.equal(3);
        expect(memoAdd(1, 2)).to.equal(3);
      });

      it('should give different results for different arguments', function() {
        expect(memoAdd(1, 2)).to.equal(3);
        expect(memoAdd(3, 4)).to.equal(7);
      });

      it('should not run the memoized function twice for any given set of arguments', function() {
        // Here, we wrap a dummy function in a spy. A spy is a wrapper function (much like _.memoize
        // or _.once) that keeps track of interesting information about the function it's spying on;
        // e.g. whether or not the function has been called.
        var spy = sinon.spy(function() { return 'Dummy output'; });
        var memoSpy = _.memoize(spy);

        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
        memoSpy(10);
        expect(spy).to.have.been.calledOnce;
      });
    });

    describe('delay', function() {

      _.delay = function (func, wait) {

        if (arguments.length > 2) {
          var argsArray = [];

          for (var i = 2; i<arguments.length; i++) {
            argsArray.push(arguments[i]);
          }

          return setTimeout(func.apply(this, argsArray), wait);
        }

        else {
          return setTimeout(func, wait);
        }
      

      }
      var callback;

      beforeEach(function() {
        callback = sinon.spy();
      })

      it('should only execute the function after the specified wait time', function() {
        _.delay(callback, 100);
        clock.tick(99);

        expect(callback).to.have.not.been.called;

        clock.tick(1);

        expect(callback).to.have.been.calledOnce;
      });

      it('should have successfully passed function arguments in', function() {
        _.delay(callback, 100, 1, 2);
        clock.tick(100);

        expect(callback).to.have.been.calledWith(1, 2);
      });
    });

    describe('shuffle', function() {
      it('should not modify the original object', function() {
        var numbers = [4, 5, 6];
        var shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.not.equal(numbers);
        expect(numbers).to.eql([4, 5, 6]);
      });
      it('should have the same elements as the original object', function() {
        var numbers = [4, 5, 6];
        var shuffled = _.shuffle(numbers).sort();

        expect(shuffled).to.eql([4, 5, 6]);
      });
      it('should not be in the same order as the original object', function() {
        var numbers = [4, 5, 6];
        var shuffled = _.shuffle(numbers);

        expect(shuffled).to.not.eql([4, 5, 6]);
      });
    });
  });
}());
