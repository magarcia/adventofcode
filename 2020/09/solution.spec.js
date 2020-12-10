const solution = require("./solution");

describe("Day 09", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(1492208709);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(238243506);
  });
});
