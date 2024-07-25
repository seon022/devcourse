console.log("1.");

let star1 = "";
for (let i = 0; i < 5; i++) {
  star1 += "*";
}
console.log(star1);

console.log("--------------");
console.log("2.");
let star2 = "";
for (let i = 0; i < 5; i++) {
  star2 += "*\n";
}
console.log(star2);

console.log("--------------");
console.log("3.");
let line = "";
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    line += "*";
  }
  line = line + "\n";
}
console.log(line);

console.log("--------------");
console.log("4.");

let star4 = "";
for (let i = 1; i < 6; i++) {
  for (let j = 0; j < i; j++) {
    star4 += "*";
  }
  star4 = star4 + "\n";
}
console.log(star4);

console.log("--------------");
console.log("5.");

let star5 = "";
for (let i = 6; i > 0; i--) {
  for (let j = i; j > 0; j--) {
    star5 += "*";
  }
  star5 = star5 + "\n";
}
console.log(star5);

console.log("--------------");
console.log("6.");

let result = "";
for (let i = 0; i < 5; i++) {
  let space = "";
  let star = "";

  for (let j = 0; j < 4 - i; j++) {
    space += " ";
  }

  for (let k = 0; k <= i; k++) {
    star += "*";
  }

  result += space + star + "\n";
}

console.log(result);

console.log("--------------");
