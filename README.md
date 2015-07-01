# async-merge-sort

<a href="http://apostrophenow.org/"><img src="https://raw.github.com/punkave/async-merge-sort/master/logos/logo-box-madefor.png" align="right" /></a>

`async-merge-sort` can efficiently sort an array with an asynchronous comparison function. It is suitable for sorts driven by prompting the user for each comparison, or any other situation where you cannot reduce each item to a "score" that can be compared synchronously.

## How to use

```javascript
    // in-browser example, with browserify and jQuery.
    // Can also be used server side via npm install

    var asyncMergeSort = require('async-merge-sort');

    var $a = $('[data-a]');
    var $b = $('[data-b]');
    return asyncMergeSort(items, function(a, b, callback) {
      // compare the items by prompting the user to click
      // one or the other. We'll re-label two elements in
      // the page and wait to see which is clicked
      $a.text(a);
      $b.text(b);
      $a.off('click');
      $b.off('click');
      $a.on('click', function() {
        return callback(null, a);
      });
      $b.on('click', function() {
        return callback(null, b);
      });
    }, function(err, sorted) {
      if (err) {
        // Comparison function reported an error
        alert('Oh dear, an error occurred.');
      }
      // log the sorted items
      console.log(sorted);
    });
```

## Limitations

Since the overwhelming majority of the time presumably is spent waiting around for the comparison function to invoke its callback, this module is not written with raw speed in mind. It's also possible to create fewer arrays. This was simply the most readable version of the algorithm.

## Browser Compatibility

No new-wave JavaScript features are required. Expected to work in all browsers going back quite a long way.

## Changelog

0.1.1: removed dependency on lodash. No longer imports any other modules.

0.1.0: initial version. Passing unit tests.

## About P'unk Avenue and Apostrophe

`async-merge-sort` was created at [P'unk Avenue](http://punkave.com) for use in projects based on Apostrophe, an open-source content management system built on node.js. If you like `async-merge-sort` you should definitely [check out apostrophenow.org](http://apostrophenow.org). Also be sure to visit us on [github](http://github.com/punkave).

## Support

Feel free to open issues on [github](http://github.com/punkave/async-merge-sort).

<a href="http://punkave.com/"><img src="https://raw.github.com/punkave/async-merge-sort/master/logos/logo-box-builtby.png" /></a>
