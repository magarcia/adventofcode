const fs = require("fs");
const path = require("path");

function getTwoValuesThatSum(nums, target) {
  let seen = {};

  for (let i = 0; i < nums.length; i++) {
    const wanted = target - nums[i];
    if (typeof seen[wanted] !== "undefined") {
      return [wanted, nums[i]];
    }
    seen[nums[i]] = i;
  }
}

function threeSum(nums, target) {
  const N = nums.length;

  for (let i = 0; i < N; i++) {
    const n = nums[i];
    const want = target - n;

    const two = getTwoValuesThatSum(
      nums.slice(0, i).concat(nums.slice(i + 1)),
      want
    );
    if (two) {
      return [n, ...two];
    }
  }
}

function main() {
  const nums = fs
    .readFileSync(path.join(__dirname, "input"), "utf8")
    .split("\n")
    .map((x) => parseInt(x, 10));

  const [a, b] = getTwoValuesThatSum(nums, 2020);
  const [c, d, e] = threeSum(nums, 2020);
  return [a * b, c * d * e, [a, b], [c, d, e]];
}

module.exports = main;

if (require.main === module) {
  const [first, second, [a, b], [c, d, e]] = main();
  console.log(`${a} + ${b} = ${a + b}`);
  console.log(`${a} * ${b} = ${first}`);
  console.log();
  console.log(`${c} + ${d} + ${e} = ${c + d + e}`);
  console.log(`${c} * ${d} * ${e} = ${second}`);
}
