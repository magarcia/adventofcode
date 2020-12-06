const fs = require("fs");
const path = require("path");

function countGroup(group) {
  return new Set(group.join("").split("")).size;
}

function countGroupFixed(group) {
  let groupSets = group.map((g) => g.split("")).map((g) => new Set(g));
  return groupSets.reduce((a, b) => {
    return new Set([...a].filter((x) => b.has(x)));
  }, groupSets[0]).size;
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const groups = input.split("\n\n").map((g) => g.split("\n"));

  return [
    groups.map(countGroup).reduce((a, b) => a + b, 0),
    groups.map(countGroupFixed).reduce((a, b) => a + b, 0),
  ];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
