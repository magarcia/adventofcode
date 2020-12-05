const solution = require("./solution");

describe("Day 05", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(801);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(597);
  });
});
