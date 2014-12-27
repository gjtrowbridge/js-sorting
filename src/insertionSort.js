

// Returns a sorted version of the whatever is passed in
var insertionSort = function(toSort, comparisonFn) {
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

  // Iterates from left to right, sorting as it goes
  for (var i=1; i<toSort.length; i++) {
    var toPlace = toSort[i];
    for (var j=i-1; j>=0; j--) {
      // If current one is bigger, swap them
      if (comparisonFn(toSort[j], toPlace)) {
        var temp = toSort[j];
        toSort[j] = toPlace;
        toSort[j+1] = temp;
      } else {
        break;
      }
    }
  }


  if (convertBackToString) {
    toSort = toSort.join('');
  }

  return toSort;
};
