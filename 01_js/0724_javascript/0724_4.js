// power() 메소드를 추가
Number.prototype.power = function (n = 2) {
  return this.valueOf() ** n;
};
// Number객체의 power메소드 사용
const a = 12;
console.log("a.power():", a.power());
