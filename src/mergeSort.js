// Returns a sorted version of the whatever is passed in
var mergeSort = function(toSort, comparisonFn) {
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

  //Merges two sorted arrays
  var merge = function(left, right) {
    var lIndex = 0;
    var rIndex = 0;
    var result = [];

    //Increment pointers in each array, combining appropriately
    //until both are empty and you have a sorted result
    while(lIndex < left.length || rIndex < right.length) {
      if (lIndex >= left.length) {
        result = result.concat(right.slice(rIndex));
        rIndex = right.length;
      } else if (rIndex >= right.length) {
        result = result.concat(left.slice(lIndex));
        lIndex = left.length;
      } else {
        if (comparisonFn(left[lIndex], right[rIndex])) {
          result.push(right[rIndex]);
          rIndex++;
        } else {
          result.push(left[lIndex]);
          lIndex++;
        }
      }
    }
    return result;
  };

  //Merges every entry in the array with at least one of its siblings
  var combineSiblings = function(array, firstTime) {
    if (array.length <= 1) {
      if (firstTime) {
        return array;
      } else {
        return array[0];
      }
    }

    var newArray = [];

    for (var i=0; i<array.length-1; i+=2) {
      var s1 = array[i];
      var s2 = array[i+1];
      if (firstTime) {
        //The merge function expects arrays as input.
        //So for the first round of merges, we need to input
        //1-element arrays
        newArray.push(merge([s1], [s2]));
      } else {
        newArray.push(merge(s1, s2));
      }
    }

    //If odd number, combine last one with last part of newArray
    if (array.length % 2 === 1) {
      if (firstTime) {
        newArray[newArray.length-1] = merge(newArray[newArray.length-1], [array[array.length-1]]);      
      } else {
        newArray[newArray.length-1] = merge(newArray[newArray.length-1], array[array.length-1]);      
      }
    }
    return combineSiblings(newArray, false);
  };

  toSort = combineSiblings(toSort, true);

  if (convertBackToString) {
    toSort = toSort.join('');
  }

  return toSort;
};


var comparisonFn = comparisonFn || function(a, b) {
  return a > b;
};
