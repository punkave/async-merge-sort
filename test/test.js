var assert = require("assert");
var _ = require('lodash');

describe('async-merge-sort', function() {
  var asyncMergeSort;
  it('should be successfully initialized', function() {
    asyncMergeSort = require('../index.js');
    assert(asyncMergeSort);
  });
  it('should sort 100 shuffled integers with an async comparison function', function(done) {
    return trial(100, done);
  });
  it('should sort 11 shuffled integers with an async comparison function', function(done) {
    return trial(11, done);
  });
  it('should sort 101 shuffled integers with an async comparison function', function(done) {
    return trial(101, done);
  });
  it('should sort 2 shuffled integers with an async comparison function', function(done) {
    return trial(2, done);
  });
  it('should sort 1 shuffled integers with an async comparison function', function(done) {
    return trial(1, done);
  });
  it('should sort 0 shuffled integers with an async comparison function', function(done) {
    return trial(0, done);
  });
  function trial(n, done) {
    var data = _.shuffle(_.range(n));
    var comparisons = 0;
    return asyncMergeSort(data, function(a, b, callback) {
      comparisons++;
      return setTimeout(function() {
        if (a < b) {
          return callback(null, -1);
        } else if (a > b) {
          return callback(null, 1);
        } else {
          return callback(null, 0);
        }
      }, 1);
    }, function(err, items) {
      assert(!err);
      assert(items.length === n);
      for (var i = 0; (i < items.length); i++) {
        assert(items[i] === i);
      }
      if (n <= 1) {
        assert(comparisons === 0);
      } else {
        // on the order of n log n comparisons, rounding generously
        assert(comparisons < (n * Math.log(n) * 2));
      }
      return done();
    });
  }
});
