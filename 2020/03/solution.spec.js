const solution = require("./solution");

describe("Day 03", function () {
  test("part one", function () {
    const [result, _] = solution();

    expect(result).toBe(171);
  });

  test("part two", function () {
    const [_, result] = solution();

    expect(result).toBe(1206576000);
  });
});
