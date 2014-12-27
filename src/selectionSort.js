

// Returns a sorted version of the whatever is passed in
var selectionSort = function(toSort, comparisonFn) {
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

  //Loop until sorted
  for (var i=0; i<toSort.length; i++) {
    var minValue = toSort[i];
    var minIndex = i;
    //Find next lowest value
    for (var j=i+1; j<toSort.length; j++) {
      if (comparisonFn(minValue, toSort[j])) {
        minValue = toSort[j];
        minIndex = j;
      }
    }

    //Put it in the next spot
    var temp = toSort[i];
    toSort[i] = minValue;
    toSort[minIndex] = temp;
  }


  if (convertBackToString) {
    toSort = toSort.join('');
  }

  return toSort;
};
