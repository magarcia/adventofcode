const fs = require("fs");
const path = require("path");

const RUN = {
  nop: (_, acc, index) => ({ acc, nextIndex: index + 1 }),
  acc: (value, acc, index) => ({ acc: acc + value, nextIndex: index + 1 }),
  jmp: (value, acc, index) => ({ acc, nextIndex: index + value }),
};

function runLine(line, acc, index) {
  const cmdRegex = /(nop|acc|jmp) ([-+])(\d+)\S*/g;
  const m = cmdRegex.exec(line);

  const cmd = m[1];
  const value = m[2] === "-" ? parseInt(m[3], 10) * -1 : parseInt(m[3], 10);

  return RUN[cmd](value, acc, index);
}
function run(cmdLines) {
  const N = cmdLines.length;

  let visited = new Set();
  let acc = 0;
  let i = 0;

  while (!visited.has(i) && i < N) {
    let result = runLine(cmdLines[i], acc, i);
    visited.add(i);
    i = result.nextIndex;
    acc = result.acc;
  }

  return [acc, i === N];
}

function fixAndRun(cmdLines) {
  const N = cmdLines.length;

  let l = 0;
  let originalInst;
  for (let i = 0; i < N; i++) {
    if (cmdLines[i].includes("acc")) continue;
    originalInst = cmdLines[i];
    l = i;

    if (cmdLines[i].includes("nop")) {
      cmdLines[i] = cmdLines[i].replace("nop", "jmp");
    } else if (cmdLines[i].includes("jmp")) {
      cmdLines[i] = cmdLines[i].replace("jmp", "nop");
    }
    const [acc, completed] = run(cmdLines);
    if (completed) return acc;
    cmdLines[i] = originalInst;
  }
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const cmdLines = input.split("\n");

  const [acc1, _] = run(cmdLines);
  const acc2 = fixAndRun(cmdLines);

  return [acc1, acc2];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
