const fs = require("fs");
const path = require("path");

function isValidPassword({ min, max, letter, password }) {
  const count = (password.match(new RegExp(letter, "g")) || []).length;

  return count <= max && count >= min;
}

function isValidPasswordPolicyUpdated({ min, max, letter, password }) {
  const first = password.charAt(min - 1);
  const last = password.charAt(max - 1);
  return (first === letter || last === letter) && first !== last;
}

function main() {
  const regex = /(\d+)\-(\d+)\s+([a-z]):\s+(.*)/gm;
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const passwords = [];

  while ((m = regex.exec(input)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    passwords.push({
      min: parseInt(m[1], 10),
      max: parseInt(m[2], 10),
      letter: m[3],
      password: m[4],
    });
  }

  return [
    passwords.filter(isValidPassword).length,
    passwords.filter(isValidPasswordPolicyUpdated).length,
  ];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
