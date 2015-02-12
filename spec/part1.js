(function() {
  'use strict';

  describe('Part I', function() {

    describe('identity', function() {
      var uniqueObject = {};


      it('should return whatever value is passed into it', function() {

      _.identity = function(val) {
          return val;
        };
        expect(_.identity(1)).to.equal(1);
        expect(_.identity('string')).to.equal('string');
        expect(_.identity(false)).to.be.false;
        expect(_.identity(uniqueObject)).to.equal(uniqueObject);
      });
    });

    describe('first', function() {
      it('should be able to pull out the first element of an array', function() {
        expect(_.first([1,2,3])).to.equal(1);
      });

      it('should accept an index argument', function() {
        expect(_.first([1,2,3], 2)).to.eql([1, 2]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(_.first([1,2,3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('last', function() {

      _.last = function(array, n) {
        return n === undefined ? array[array.length-1] : array.slice(Math.max(array.length-n,0), array.length);
      };
      it('should pull the last element from an array', function() {
        expect(_.last([1,2,3])).to.equal(3);
      });

      it('should accept an index argument', function() {
        expect(_.last([1,2,3], 2)).to.eql([2, 3]);
      });

      it('should return empty array if zero is passed in as the index', function() {
        expect(_.last([1,2,3], 0)).to.eql([]);
      });

      it('should return all the array\'s elements if the index argument is larger than the length of the array', function() {
        expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
      });
    });

    describe('each', function() {
      it('should iterate over arrays, providing access to the element, index, and array itself', function() {

      _.each = function(collection, iterator) {

        var i;
        if (Array.isArray(collection)) {
          for (i = 0; i<collection.length; i++) {
            iterator(collection[i], i, collection);
          }
        }
        else {
          for (i in collection) {
            iterator(collection[i], i, collection);
          }
        }


      } 

        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        _.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should only iterate over the array elements, not properties of the array', function() {
        var animals = ['ant', 'bat', 'cat'];
        var iterationInputs = [];

        animals.shouldBeIgnored = 'Ignore me!';

        _.each(animals, function(animal, index, list) {
          iterationInputs.push([animal, index, list]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 0, animals],
          ['bat', 1, animals],
          ['cat', 2, animals]
        ]);
      });

      it('should iterate over objects, providing access to the element, index, and object itself', function() {
        var animals = { a: 'ant', b: 'bat', c: 'cat' };
        var iterationInputs = [];

        _.each(animals, function(animal, key, object) {
          iterationInputs.push([animal, key, object]);
        });

        expect(iterationInputs).to.eql([
          ['ant', 'a', animals],
          ['bat', 'b', animals],
          ['cat', 'c', animals]
        ]);
      });
    });

    describe('indexOf', function() {
      it('should find 40 in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 40)).to.equal(3);
      });

      it('should be able to compute indexOf even when the native function is undefined', function() {
        var numbers = [10, 20, 30];

        expect(_.indexOf(numbers, 20)).to.equal(1);
      });

      it('returns -1 when the target cannot be found not in the list', function() {
        var numbers = [10, 20, 30, 40, 50];

        expect(_.indexOf(numbers, 35)).to.equal(-1);
      });

      it('returns the first index that the target can be found at when there are multiple matches', function() {
        var numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];

        expect(_.indexOf(numbers, 40)).to.equal(1);
      });
    });

    describe('filter', function() {

      _.filter = function (collection, test) {
        var newArray=[];
        for (var i = 0; i<collection.length; i++) {
          if (test(collection[i])) {
            newArray.push(collection[i]);
          }
        }
        return newArray;

      };
      it('should return all even numbers in an array', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should return all odd numbers in an array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.filter(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('reject', function() {
      _.reject = function (collection, test) {
       var falseArray = [],
          trueArray = _.filter (collection, test);
       for (var i = 0; i< collection.length; i++) {
        if (_.indexOf(trueArray, collection[i]) === -1) {
          falseArray.push(collection[i]);
        }
       }
       return falseArray;
      };

      it('should reject all even numbers', function() {
        var isEven = function(num) { return num % 2 === 0; };
        var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

        expect(odds).to.eql([1, 3, 5]);
      });

      it('should reject all odd numbers', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

        expect(evens).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var isOdd = function(num) { return num % 2 !== 0; };
        var numbers = [1, 2, 3, 4, 5, 6];
        var evens = _.reject(numbers, isOdd);

        expect(evens).to.not.equal(numbers);
      });
    });

    describe('uniq', function() {
      _.uniq = function(array) {
        var newArray = [];
        for (var i = 0; i< array.length; i++) {
          if (_.indexOf(newArray, array[i]) === -1) {
            newArray.push(array[i]);
          }
        }
        return newArray;
      }

      it('should return all unique values contained in an unsorted array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];

        expect(_.uniq(numbers)).to.eql([1, 2, 3, 4]);
      });

      it('should handle iterators that work with a sorted array', function() {
        var iterator = function(value) { return value + 1; };
        var numbers = [1, 2, 2, 3, 4, 4];

        expect(_.uniq(numbers, true, iterator)).to.eql([1, 2, 3, 4]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 1, 3, 1, 4];
        var uniqueNumbers = _.uniq(numbers);

        expect(uniqueNumbers).to.not.equal(numbers);
      });
    });

    describe('map', function() {

      _.map = function (collection, iterator) {
        var mapArray = [];

       _.each(collection,function (element) { mapArray.push(iterator(element))}); //creates a new Array after invoking each
        /*for (var i = 0; i< collection.length; i++) {
           mapArray.push(iterator(collection[i]));
        }*/
        return mapArray;
      }

      it('should apply a function to every value in an array', function() {
        var doubledNumbers = _.map([1, 2, 3], function(num) {
          return num * 2;
        });

        expect(doubledNumbers).to.eql([2, 4, 6]);
      });

      it('should produce a brand new array instead of modifying the input array', function() {
        var numbers = [1, 2, 3];
        var mappedNumbers = _.map(numbers, function(num) {
          return num;
        });

        expect(mappedNumbers).to.not.equal(numbers);
      });
    });

    describe('pluck', function() {
      it('should return values contained at a user-defined property', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
      });

      it('should not modify the original array', function() {
        var people = [
          { name: 'moe', age: 30 },
          { name: 'curly', age: 50 }
        ];

        _.pluck(people, 'name');

        expect(people).to.eql([{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }]);
      });
    });

    describe('reduce', function() {

      _.reduce = function(collection, iterator, accumulator) {
       
        var val, 
            start = 0;

        if (arguments.length < 3) {
          accumulator = collection[0];
          start = 1;
        }
        if (Array.isArray(collection)) {
          for (var i = start; i < collection.length; i++) {
            accumulator = iterator(accumulator, collection[i]);
          }
        }

        else {
          for (var i in collection) {
            accumulator = iterator(accumulator, collection[i]);
          }
        }

        return accumulator;

      }
      it('should be able to sum up an array', function() {
        var add = function(tally, item) {return tally + item; };
        var total = _.reduce([1, 2, 3], add, 0);

        expect(total).to.equal(6);
      });

      it('should use the first element as an accumulator when none is given', function() {
        var add = function(tally, item) {return tally + item; };
        var total = _.reduce([1, 2, 3], add);

        expect(total).to.equal(6);
      });

      it('should invoke the iterator on the first element when given an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = _.reduce([2, 3], sumSquares, 0);

        expect(total).to.equal(13);
      });

      it('should not invoke the iterator on the first element when using it as an accumulator', function() {
        var sumSquares = function(tally, item) {return tally + item * item; };
        var total = _.reduce([2, 3], sumSquares);

        expect(total).to.equal(11);
      });

    });
  });

}());
