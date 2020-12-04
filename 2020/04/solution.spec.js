const solution = require("./solution");

describe("Day 04", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(239);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(188);
  });
});
