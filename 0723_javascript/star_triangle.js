const n = 5; // 삼각형의 높이
let star = "*";
let space = " ";

// 위쪽 큰 삼각형

for (let i = 0; i < n; i++) {
  console.log(space.repeat(n - i + 5) + star.repeat(2 * i + 1));
}

// 아래쪽 두 개의 작은 삼각형
for (let i = 0; i < n; i++) {
  const spacesMid = space.repeat((n - i) * 2 - 1);
  if (i === n) {
    console.log(star.repeat(2 * n - 1) + " " + star.repeat(2 * n - 1));
  } else {
    console.log(
      space.repeat(n - i) +
        star.repeat(2 * i + 1) +
        spacesMid +
        star.repeat(2 * i + 1)
    );
  }
}
