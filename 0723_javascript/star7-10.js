console.log("--------------");
console.log("7.");

let result7 = "";
for (let i = 5; i > 0; i--) {
  let space = "";
  let star = "";

  // 공백 추가
  for (let j = 0; j < 5 - i; j++) {
    space += " ";
  }

  // 별 추가
  for (let k = 0; k < i; k++) {
    star += "*";
  }

  result7 += space + star + "\n";
}

console.log(result7);

console.log("--------------");

console.log("8.");

for (let i = 0; i < 5; i++) {
  let space = " ";
  let star = "*";
  let result = "";

  result = space.repeat(4 - i) + star.repeat(2 * i + 1);
  console.log(result);
}

console.log("--------------");

console.log("9.");

let result9 = "";
for (let i = 5; i > 0; i--) {
  let space = "";
  let star = "*";

  // 공백 추가
  for (let j = 0; j < 5 - i; j++) {
    space += " ";
  }

  // 별 추가
  for (let k = 1; k < i; k++) {
    star += "**";
  }

  result9 += space + star + "\n";
}

console.log(result9);

console.log("--------------");

console.log("10.");

for (let i = 0; i < 5; i++) {
  let space = " ";
  let star = "*";
  let result = "";

  result = space.repeat(4 - i) + star.repeat(2 * i + 1);
  console.log(result);
}
for (let i = 1; i < 5; i++) {
  let space = " ";
  let star = "*";
  let result = "";

  result = space.repeat(i) + star.repeat((5 - i) * 2 - 1);
  console.log(result);
}
