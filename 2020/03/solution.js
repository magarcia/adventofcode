const fs = require("fs");
const path = require("path");

function getNumberOfTrees(slopes, map) {
  let total = 1;
  for (let [toRight, toDown] of slopes) {
    let horizontal = 0;
    let vertical = 0;

    let count = 0;
    while (vertical < map.length) {
      if (map[vertical][horizontal] === "#") count++;

      horizontal = (horizontal + toRight) % map[0].length;
      vertical += toDown;
    }
    total = total * count;
  }
  return total;
}

function main() {
  const map = fs
    .readFileSync(path.join(__dirname, "input"), "utf8")
    .split("\n")
    .map((x) => x.split(""));

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return [getNumberOfTrees([[3, 1]], map), getNumberOfTrees(slopes, map)];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
