const solution = require("./solution");

describe("Day 02", function () {
  test("part one", function () {
    const [result, ...rest] = solution();

    expect(result).toBe(600);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(245);
  });
});
