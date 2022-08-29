/* @jsx createElement */

// 위처럼 해주면 원래는 React.createElement로 변환될 아래 코드가
// createElement로 변환된다.

import { createDOM, createElement, render } from "./react";
// 밑에서 createElement를 코드상에선 쓰고있지 않지만 포함해줘야함.
// 그래야 런타임에 오류안남.
// 리액트에서 항상 react를 임포트해야하는 이유도 같다.
// 빌드된 파일 안에서 그 코드를 찾지 못하기 때문에 런타임에 에러가 발생.

//이렇게 변환되는 것이다.
// const vdom = createElement('p', {},
//   createElement('h1', {}, "React 만들기"),
//   createElement('ul', {},
//     createElement('li', { style: "color:red" }, "첫 번째 아이템"),
//     createElement('li', { style: "color:blue" }, "두 번째 아이템"),
//     createElement('li', { style: "color:green" }, "세 번째 아이템"),
//     )
//   );

// 바벨의 트랜스파일러가 props가 비어있으면 빈객체 아닌 null로 넘기기 때문에
// 우리가 만든 createElement함수도 수정, 처리해줘야한다.

const vdom = (
  <p>
    <h1>React 만들기</h1>
    <ul>
      <li style="color:red">첫 번째 아이템</li>
      <li style="color:blue">두 번째 아이템</li>
      <li style="color:green">세 번째 아이템</li>
    </ul>
  </p>
);

render(vdom, document.querySelector("#root"));
