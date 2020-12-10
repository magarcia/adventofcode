const solution = require("./solution");

describe("Day 08", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(1816);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(1149);
  });
});
