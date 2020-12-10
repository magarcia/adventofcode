const fs = require("fs");
const path = require("path");

function findDifferences(adapters) {
  adapters.sort((a, b) => a - b);
  const diffs = {
    1: 0,
    3: 1,
  };
  let prev = 0;
  for (let adpt of adapters) {
    diffs[adpt - prev]++;
    prev = adpt;
  }

  return diffs[1] * diffs[3];
}

function sum(array) {
  return array.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function findCombinations(adapters) {
  const MAX = Math.max(...adapters) + 3;
  const combi = Array.from({ length: MAX }, () => 0);
  combi[0] = 1;

  adapters = new Set([...adapters, MAX]);

  for (let i = 1; i <= MAX; i++) {
    if (adapters.has(i)) {
      combi[i] =
        (combi[i - 1] || 0) + (combi[i - 2] || 0) + (combi[i - 3] || 0);
    }
  }

  return combi[MAX];
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const adapters = input.split("\n").map((x) => parseInt(x, 10));
  const n1 = findDifferences(adapters);
  const n2 = findCombinations(adapters);

  return [n1, n2];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
