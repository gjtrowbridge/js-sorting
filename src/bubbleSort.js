

// Returns a sorted version of the whatever is passed in
var bubbleSort = function(toSort, comparisonFn) {
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

  //Loops until everything is sure to be sorted
  for (var maxIndex = toSort.length-1; maxIndex>0; maxIndex--) {
    // Iterates from left to right, bubble sorting as it goes
    for (var j = 1; j <= maxIndex; j++) {
      // If current one is bigger, swap them
      if (comparisonFn(toSort[j-1], toSort[j])) {
        var temp = toSort[j-1];
        toSort[j-1] = toSort[j];
        toSort[j] = temp;
      }
    }
  }


  if (convertBackToString) {
    toSort = toSort.join('');
  }

  return toSort;
};
