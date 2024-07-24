// contain()메소드 추가
String.prototype.contain = function (data) {
  return this.indexOf(data) >= 0;
};

Array.prototype.contain = function (data) {
  return this.indexOf(data) >= 0;
};
const b = "안녕하세요";
console.log("안녕 in 안녕하세요 : ", b.contain("안녕"));
console.log("없어 in 안녕하세요 : ", b.contain(" 없어"));

const c = [23, 264, 244, 45, 56];
console.log("264 in [23, 264, 244, 45, 56,]", c.contain(" 264"));
console.log("0 in [23, 264, 244, 45, 56,]", c.contain(" 23"));
