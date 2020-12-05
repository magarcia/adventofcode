const fs = require("fs");
const path = require("path");

function binaryProcess(chars, _start, _end, fCode, bCode) {
  let start = _start;
  let end = _end;
  for (let c of chars.split("")) {
    let mid = start + Math.floor((end - start) / 2);
    if (c === fCode) end = mid;
    if (c === bCode) start = mid;
  }
  return end;
}

function parseSeatRow(seat) {
  const chars = seat.slice(0, 7);
  return binaryProcess(chars, 0, 127, "F", "B");
}

function parseSeatColumn(seat) {
  const chars = seat.slice(7);
  return binaryProcess(chars, 0, 7, "L", "R");
}

function parseSeat(seat) {
  return {
    row: parseSeatRow(seat),
    column: parseSeatColumn(seat),
  };
}

function calcId({ row, column }) {
  return { id: row * 8 + column, row, column };
}

function findEmptySeat(seats) {
  seats.sort((a, b) => a.id - b.id);

  let i;
  for (i = 0; i < seats.length; i++) {
    if (seats[i].id === seats[i + 1].id - 2) break;
  }

  return seats[i].id + 1;
}

function main() {
  const input = fs.readFileSync(path.join(__dirname, "input"), "utf8");
  const seats = input.split("\n").map(parseSeat).map(calcId);

  const mySeat = findEmptySeat(seats);

  return [
    Math.max.apply(
      this,
      seats.map(({ id }) => id)
    ),
    mySeat,
  ];
}

module.exports = main;

if (require.main === module) {
  console.log(main());
}
