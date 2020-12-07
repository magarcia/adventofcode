const solution = require("./solution");

describe("Day 07", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(144);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(5956);
  });
});
