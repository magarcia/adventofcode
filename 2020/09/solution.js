const fs = require("fs");
const path = require("path");

function twoSum(nums, target) {
  let seen = {};

  for (let i = 0; i < nums.length; i++) {
    const wanted = target - nums[i];
    if (typeof seen[wanted] !== "undefined") {
      return true;
    }
    seen[nums[i]] = i;
  }
  return false;
}

function firstInvalid(nums) {
  const N = nums.length;

  for (let i = 25; i < N; i++) {
    const works = twoSum(nums.slice(i - 25, i), nums[i]);
    if (!works) return nums[i];
  }
}

function sum(array) {
  return array.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function findWeaknes(nums, target) {
  let start = 0;
  let length = 1;
  let acc = sum(nums.slice(start, length));

  while (acc !== target) {
    if (acc > target) {
      start++;
      length--;
    }
    if (acc < target) length++;
    acc = sum(nums.slice(start, length));
  }

  return (
    Math.min.apply(this, nums.slice(start, length)) +
    Math.max.apply(this, nums.slice(start, length))
  );
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const nums = input.split("\n").map((x) => parseInt(x, 10));
  const n1 = firstInvalid(nums);
  const n2 = findWeaknes(nums, n1);

  return [n1, n2];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
