const solution = require("./solution");

describe("Day 10", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(1984);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(3543369523456);
  });
});
