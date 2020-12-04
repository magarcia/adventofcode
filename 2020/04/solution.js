const fs = require("fs");
const path = require("path");

const REQUIRED_FIELDS = {
  byr: (x) => {
    const val = parseInt(x);
    if (isNaN(val)) return false;
    return 1920 <= val && val <= 2002;
  },
  iyr: (x) => {
    const val = parseInt(x);
    if (isNaN(val)) return false;
    return 2010 <= val && val <= 2020;
  },
  eyr: (x) => {
    const val = parseInt(x);
    if (isNaN(val)) return false;
    return 2020 <= val && val <= 2030;
  },
  hgt: (x) => {
    const regex = /^(\d{2,3})(in|cm)$/g;
    const match = regex.exec(x);
    if (!match) return false;
    const val = parseInt(match[1]);
    if (match[2] == "in") return 59 <= val && val <= 76;
    return 150 <= val && val <= 193;
  },
  hcl: (x) => {
    const regex = /^#[0-9a-f]{6}$/i;
    return !!regex.exec(x);
  },
  ecl: (x) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(x),
  pid: (x) => {
    const regex = /^\d{9}$/g;
    return !!regex.exec(x);
  },
};
const REQUIRED_KEYS = Object.keys(REQUIRED_FIELDS);
const OPTIONAL_KEYS = ["cid"];

function parsePassport(passport) {
  return passport
    .replace(/\n/g, " ")
    .split(" ")
    .map((x) => x.split(":"))
    .reduce((map, [k, v]) => {
      map.set(k, v);
      return map;
    }, new Map());
}

function isValid(passport) {
  return (
    Array.from(passport.keys())
      .filter((x) => !OPTIONAL_KEYS.includes(x))
      .sort()
      .join(":") === REQUIRED_KEYS.sort().join(":")
  );
}

function isValid2(passport) {
  return Array.from(passport.entries()).reduce((acc, [key, val]) => {
    if (OPTIONAL_KEYS.includes(key)) return acc && true;
    if (!REQUIRED_FIELDS.hasOwnProperty(key)) {
      return false;
    }

    return acc && REQUIRED_FIELDS[key](val);
  }, true);
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const passports = input.split("\n\n").map(parsePassport);

  return [
    passports.filter(isValid).length,
    passports.filter(isValid).filter(isValid2).length,
  ];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
