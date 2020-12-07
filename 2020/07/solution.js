const fs = require("fs");
const path = require("path");

function parseBags(str) {
  let [bag, _content] = str.split(" bags contain ");
  let content = _content
    .replace(/\.$/, "")
    .split(", ")
    .map((cstr) => {
      let regex = /^\s*(\d+)\s+(\w+\s\w+)\s+(bag|bags)/gi;
      let m = regex.exec(cstr);
      if (!m) return;
      return {
        amount: m[1],
        color: m[2],
      };
    });
  return {
    color: bag,
    content: content.filter((x) => !!x),
  };
}

function findColors(bags) {
  let canHold = ["shiny gold"];
  let totalHold = [];
  while (canHold.length > 0) {
    let newHold = [];
    for (let bag of bags) {
      let contents = bag.content.map((c) => c.color);
      for (let cont of contents) {
        if (canHold.includes(cont)) {
          newHold.push(bag.color);
        }
      }
    }
    canHold = newHold;
    totalHold = [...totalHold, ...canHold];
  }
  return new Set(totalHold).size;
}

function countNestedBags(bags, color = "shiny gold") {
  let map = new Map();
  for (let bag of bags) {
    map.set(bag.color, bag.content);
  }

  let amount = 1;
  let currentBag = map.get(color);
  for (let nestBag of currentBag) {
    amount += nestBag.amount * countNestedBags(bags, nestBag.color);
  }
  return amount;
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const bags = input.split("\n").map(parseBags);
  const colors = findColors(bags);
  const numOfBags = countNestedBags(bags) - 1;

  return [colors, numOfBags];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
