const { add } = require('../../src/core/math.js');

test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});
