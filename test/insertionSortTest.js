
var sortFns = [
  {
    name: 'insertionSort',
    fn: insertionSort,
    stable: true
  }
];

// Tests all the sort functions at once
for (var i=0; i<sortFns.length; i++) {
  describe(sortFns[i].name, function() {

    var sortFn = sortFns[i].fn;

    it('should be a function', function() {
      expect(typeof sortFn).toBe('function');
    });
    
    it('should sort in ascending order by default', function() {
      expect(sortFn('cabd')).toBe('abcd');
    });
    
    it('should be able to sort arrays', function() {
      expect(sortFn(['hi', 'there', 'everyone'])).toEqual(['everyone', 'hi', 'there']);
    });

    it('should not sort arrays in-place', function() {
      var arr = ['hi', 'there', 'everyone'];
      expect(sortFn(arr)).not.toBe(arr);
    });

  });
  
}