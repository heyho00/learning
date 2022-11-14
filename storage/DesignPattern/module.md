# Module

## 코드를 더 작고 재사용 가능한 조각으로 분할

```js
// Math.js

export function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```

```js
//index.js

import { add, multiply, subtract, square } from "./math.js";
```

경우에 따라 이름이 로컬값과 충돌할 수 있다.

```js
import { add, multiply, subtract, square } from "./math.js";

// as 를 이용해 이름을 바꿔 쓸 수 있다.
// import {
//   add as addValues,
//   multiply as multiplyValues,
//   subtract,
//   square
// } from "./math.js";

function add(...args) {
  return args.reduce((acc, cur) => cur + acc);
} /* Error: add has  already been declared */

function multiply(...args) {
  return args.reduce((acc, cur) => cur * acc);
}
/* Error: multiply has already been declared */
```

<br>
export default 이용하기

```js
export default function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```

```JS
// export default로 내보낸건 대괄호 없이
import add, { multiply, subtract, square } from "./math.js";

add(7, 8);
multiply(8, 9);
subtract(10, 3);
square(3);
```

<br>

## Dynamic import

필요에 따라 모듈을 가져올 수 있다.

사용자가 버튼을 클릭하는 경우에만 모듈이 로드되는 경우.

```js
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  import("./math.js").then((module) => {
    console.log("Add: ", module.add(1, 2));
    console.log("Multiply: ", module.multiply(3, 2));

    const button = document.getElementById("btn");
    button.innerHTML = "Check the console";
  });
});

/*************************** */
/**** Or with async/await ****/
/*************************** */
// button.addEventListener("click", async () => {
//   const module = await import("./math.js");
//   console.log("Add: ", module.add(1, 2));
//   console.log("Multiply: ", module.multiply(3, 2));
// });
```

사용자가 필요로 할 때 필요로 하는 코드를 동적으로 가져와 페이지 로드 시간을 줄인다.
