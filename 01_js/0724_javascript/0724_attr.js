// 객체를 생성합니다.
const object = {
  name: "혼자 공부하는 파이썬",
  price: 18000,
  publisher: "한빛미디어",
};

// 객체에서 변수를 추출합니다.
// name 속성과 price속성을 그대로 꺼냄.
const { name, price } = object;
console.log("#속성이름 그대로 꺼내서 출력하기");
console.log(name, price);
console.log("");

const { a = name, b = price } = object;
console.log("#속성을 다른이름으로 꺼내서 출력하기");
console.log(a, b);
console.log("");
