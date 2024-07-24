const pet = {
  name: "구름",
  eat: function (food) {
    alert(this.name + "은/는 " + food + "을/를 먹습니다.");
  },
};
// 메소드 호출
pet.eat("밥");

/* 
JSON.stringify()는 JavaScript 객체를 JSON 형식의 문자열로 변환하는 메서드입니다. 주로 웹 서버와 데이터를 주고받을 때 사용됩니다.
이 메서드의 기본 구문은 다음과 같습니다:
javascript
JSON.stringify(value[, replacer[, space]])

주어진 코드에서 JSON.stringify()는 다음과 같이 사용되었습니다:
javascript
JSON.stringify(student, null, 2)

여기서 각 매개변수의 의미는 다음과 같습니다:
student: 변환할 JavaScript 객체입니다.
null: replacer 함수로, 여기서는 사용되지 않았습니다.
2: 들여쓰기에 사용할 공백 문자의 수입니다. 이는 결과 문자열을 보기 좋게 형식화합니다.
JSON.stringify()의 주요 특징은 다음과 같습니다:
객체의 속성들을 문자열로 변환합니다.
숫자, 문자열, 불리언, null 값은 그대로 변환됩니다.
날짜 객체는 ISO 형식의 문자열로 변환됩니다.
함수, undefined, Symbol은 객체에서 제외되거나 배열에서 null로 변환됩니다.
주어진 코드의 실행 결과는 다음과 같을 것입니다:
json
{
  "이름": "윤인성",
  "취미": "악기",
  "장래희망": "생명공학자"
}

이렇게 변환된 JSON 문자열은 데이터 저장이나 네트워크 통신에 사용될 수 있으며, 필요할 때 JSON.parse() 메서드를 사용하여 다시 JavaScript 객체로 변환할 수 있습니다.
*/
