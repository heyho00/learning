// Hash Map
// 해싱된 맵
// 맵이라는 것은 키와 값, 쌍으로 데이터를 보관하는 자료구조이다.
// 해싱은 암호화와 완전히 동일한 개념은 아니다.
// 데이터를 고정된 길이의 해시값으로 변환하는 것.
// 현재는 맵이 키와 값 쌍으로 이뤄진 자료구조란 점에 집중한다.

// 예제
// 학급 회장을 뽑는데 후보로 기호 A, B, C, D, E 후보가 등록을 했습니다.
// 투표용지에는 반 학생들이 선택한 후보의 기호(알파벳)가 쓰여져 있으며
// 선생님은 그 기호를 발표하고 있습니다.
// 선생님의 발표가 끝난 후 어떤 기호의 후보가 학급 회장이 되었는지 출력하는 프로그램을 작성하세요.
// 반드시 한 명의 학급회장이 선출되도록 투표결과가 나왔다고 가정합니다.

// 입력예제
// BACBACCACCBDEDE

function solution(str) {
  let answer;
  let sH = new Map();

  for (let x of str) {
    if (sH.has(x)) sH.set(x, sH.get(x) + 1);
    else sH.set(x, 1);
  }

  let max = Number.MIN_SAFE_INTEGER;

  for (let [key, val] of sH) {
    if (val > max) {
      max = val;
      answer = key;
    }
  }
  return answer;
}

describe("solution", () => {
  test("가장 자주 등장한 알파벳을 반환", () => {
    expect(solution("abbccc")).toBe("c");
    expect(solution("hello world")).toBe("l");
    expect(solution("banana")).toBe("a");
  });
});
