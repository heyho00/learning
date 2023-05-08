# TypeScript Challenges

<https://github.com/type-challenges/type-challenges>

## Get Return Type

내장 제네릭 `ReturnType<T>`을 이를 사용하지 않고 구현하세요.

예시 :

```js
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

답 :

```js
type MyReturnType<T extends Function> =
  T extends (...args: any) => infer R
    ? R
    : never
```

## Omit

T에서 K 프로퍼티만 제거해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Omit<T, K>`를 이를 사용하지 않고 구현하세요.

예시:

```js
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

오답 :

```js
type MyOmit<T, K extends keyof T> = 
```

정답 :

```js
type MyOmit<T, K extends keyof T> = {[P in keyof T as P extends K ? never: P] : T[P]}

type MyOmit<T, K> = { [key in keyof T as key extends K ? never : key]: T[key] };
```
