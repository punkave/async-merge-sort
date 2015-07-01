var assert = require("assert");

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
    var data = [];
    for (var i = 0; (i < n); i++) {
      data[i] = i;
    }
    shuffle(data);
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

  // http://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

});
