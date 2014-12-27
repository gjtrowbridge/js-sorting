
var sortFns = [
  {
    name: 'insertionSort',
    fn: insertionSort,
    stable: true
  },
  {
    name: 'bubbleSort',
    fn: bubbleSort,
    stable: true
  },
  {
    name: 'selectionSort',
    fn: selectionSort,
    stable: true
  },
  {
    name: 'mergeSort',
    fn: mergeSort,
    stable: true
  }
];

// Tests all the sort functions at once
for (var i=0; i<sortFns.length; i++) {
  var sortObject = sortFns[i];
  describe(sortObject.name, function() {

    var sortFn = sortObject.fn;

    it('should be a function', function() {
      expect(typeof sortFn).toBe('function');
    });
    

    it('should be able to sort strings, and should sort in ascending order by default', function() {
      expect(sortFn('cabd')).toBe('abcd');
    });
    
    it('should be able to sort arrays', function() {
      expect(sortFn(['hi', 'there', 'everyone'])).toEqual(['everyone', 'hi', 'there']);
    });
    
    it('be able to handle empty inputs', function() {
      expect(sortFn('')).toBe('');
      expect(sortFn([])).toEqual([]);
    });

    it('should not sort arrays in-place', function() {
      var arr = ['hi', 'there', 'everyone'];
      expect(sortFn(arr)).not.toBe(arr);
    });

    it('should be able to work with custom sort functions', function() {
      var toSortDescending = 'hcagbdefi';
      var sorted = sortFn(toSortDescending, function(a, b) {
        return b > a;
      });
      expect(sorted).toBe('ihgfedcba');
    });

    it('should be able to sort arrays of nested objects', function() {
      var toSort = [
        { name: 'Bill Lumbergh', occupation: 'management consulting' },
        { name: 'Samir N.', occupation: 'disgruntled drone' },
        { name: 'Peter Gibbons', occupation: 'disgruntled drone, management material' },
        { name: 'Michael Bolton', occupation: 'disgruntled drone. not the singer.' }
      ]
      var sorted = sortFn(toSort, function(a, b) {
        return a.name > b.name;
      });
      expect(sorted).toEqual([
        { name: 'Bill Lumbergh', occupation: 'management consulting' },
        { name: 'Michael Bolton', occupation: 'disgruntled drone. not the singer.' },
        { name: 'Peter Gibbons', occupation: 'disgruntled drone, management material' },
        { name: 'Samir N.', occupation: 'disgruntled drone' }
      ]);
    });

    if (sortObject.stable) {
      it('should sort in a stable manner', function() {
        var toSort = [
          { name: 'Peter Gibbons', occupation: 'disgruntled drone, management material' },
          { name: 'Bob', occupation: 'management consulting', number: 1 },
          { name: 'Michael Bolton', occupation: 'disgruntled drone. not the singer.' },
          { name: 'Bob', occupation: 'management consulting', number: 2 },
        ]
        var sorted = sortFn(toSort, function(a, b) {
          return a.name > b.name;
        });
        expect(sorted).toEqual([
          { name: 'Bob', occupation: 'management consulting', number: 1 },
          { name: 'Bob', occupation: 'management consulting', number: 2 },
          { name: 'Michael Bolton', occupation: 'disgruntled drone. not the singer.' },
          { name: 'Peter Gibbons', occupation: 'disgruntled drone, management material' },
        ]);
      });
    }

    it('should throw an error if the input type is not valid', function() {
      expect(function() {
        sortFn({
          'this': 'is an object',
          'what': 'now?'
        });
      }).toThrow();
    });

  });
  
}