function addNumbers(a, b) {
  return a + b;
}

test("adds two numbers", () => {
  expect(addNumbers(2, 3)).toBe(5);
});

test("adds zero", () => {
  expect(addNumbers(0, 0)).toBe(0);
});

test("adds negative and positive numbers", () => {
  expect(addNumbers(-1, 1)).toBe(0);
});
