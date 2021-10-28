test('common matcher', () => {
  expect(2 + 2).toBe(4);
  expect(2 + 2).not.toBe(5);
})

test('to be true of false', () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
})

test('should number', () => {
  expect(2).toBeLessThan(3);
})

