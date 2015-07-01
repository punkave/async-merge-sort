var later;

if (typeof setImmediate === 'undefined') {
  later = function(fn) {
    return setTimeout(fn, 0);
  }
} else {
  later = setImmediate;
}

module.exports = function(items, comparator, callback) {
  // dice into lists of length 1, which are considered to be
  // internally sorted
  var lists = [];
  for (var i = 0; (i < items.length); i++) {
    lists.push([ items[i] ]);
  }

  // if there are no items, we're done
  if (!lists.length) {
    return callback(null, []);
  }

  // Make the first merging pass
  return pass();

  function pass() {
    var x = 0;
    var newLists = [];
    if (lists.length === 1) {
      // one list left, we're done
      return callback(null, lists[0]);
    }
    return merge(x, x + 1);

    function merge() {

      if (x + 1 >= lists.length) {
        if (x + 1 == lists.length) {
          newLists.push(lists[x]);
        }
        lists = newLists;
        return later(pass);
      }

      var listOne = lists[x];
      var listTwo = lists[x + 1];
      var indexOne = 0;
      var indexTwo = 0;
      var newList = [];
      // compare the first pair
      consider();

      function consider() {
        if (indexOne === listOne.length) {
          if (indexTwo === listTwo.length) {
            newLists.push(newList);
            x += 2;
            return merge();
          }
          newList.push(listTwo[indexTwo++]);
          // make async to avoid stack crashes
          return later(consider);
        } else if (indexTwo === listTwo.length) {
          newList.push(listOne[indexOne++]);
          // make async to avoid stack crashes
          return later(consider);
        }
        return comparator(listOne[indexOne], listTwo[indexTwo], function(err, value) {
          if (err) {
            return callback(err);
          }
          if (value === -1) {
            newList.push(listOne[indexOne++]);
          } else if (value === 1) {
            newList.push(listTwo[indexTwo++]);
          } else {
            newList.push(listOne[indexOne++]);
            newList.push(listTwo[indexTwo++]);
          }
          return consider();
        });
      }
    }
  }
};
