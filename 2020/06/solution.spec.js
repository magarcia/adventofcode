const solution = require("./solution");

describe("Day 06", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(6714);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(3435);
  });
});
