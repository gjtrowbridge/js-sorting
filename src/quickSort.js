

// Returns a sorted version of the whatever is passed in
var quickSort = function(toSort, comparisonFn) {
  // Sets a default comparison operator if one is not set
  comparisonFn = comparisonFn || function(a, b) {
    return a > b;
  };

  // Checks if item is either a string or array
  // If string, converts to array and remembers
  // to convert back to string at the end
  var convertBackToString = false;
  if (typeof toSort === 'string') {
    convertBackToString = true;
    toSort = toSort.split('');
  } else if (Array.isArray(toSort)) {
    // Makes a copy of the array to avoid modifying
    // the original
    toSort = toSort.slice();
  } else {
    throw('Argument is not suitable for sorting!');
  }

  var innerQuickSort = function(toSort, lo, hi) {
    //Does nothing if lo to hi doesn't encompass at least 2 entries
    if (hi - lo < 1) {
      return;
    }

    //Choose a pivot value (randomly)
    var pivotIndex = Math.floor(Math.random() * (hi - lo)) + lo;
    var pivotValue = toSort[pivotIndex];

    //Move pivot out of the way
    toSort[pivotIndex] = toSort[hi];
    toSort[hi] = pivotValue;

    //Put everything below pivot on the left,
    //Keep track of where the cut-off is for these lower values
    var swapIndex = lo;
    for (var i=lo; i<hi; i++) {
      if (comparisonFn(pivotValue, toSort[i])) {
        var temp = toSort[i];
        toSort[i] = toSort[swapIndex];
        toSort[swapIndex] = temp;
        swapIndex++;
      }
    }

    //Move the pivot value to the cutoff line
    toSort[hi] = toSort[swapIndex];
    toSort[swapIndex] = pivotValue;

    //Recursively call quickSort on both sides
    innerQuickSort(toSort, lo, swapIndex - 1);
    innerQuickSort(toSort, swapIndex + 1, hi);
  };

  innerQuickSort(toSort, 0, toSort.length - 1);

  if (convertBackToString) {
    toSort = toSort.join('');
  }

  return toSort;
};
