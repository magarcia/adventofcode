const solution = require("./solution");

describe("Day 01", function () {
  test("part one", function () {
    const [result, ...rest] = solution();

    expect(result).toBe(1006176);
  });

  test("part two", function () {
    const [_, result, ...rest] = solution();

    expect(result).toBe(199132160);
  });
});
