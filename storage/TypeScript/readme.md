# TypeScript Challenges

<https://github.com/type-challenges/type-challenges>

## Pick

T에서 K 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 Pick<T, K>을 이를 사용하지 않고 구현하세요.

```ts

// 예시
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

// 답
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
```

## Readonly

T의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

```ts
// 예시
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property

//답
type MyReadonly<T> = { readonly [P in keyof T] : T[P] }

```

## Tuple to Object

배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

```ts
//예시
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

//답
type TupleToObject<T extends readonly (string|number)[]> = {
  [K in T[number]]:K
}

type TupleToObject<T extends readonly PropertyKey[]> = {
    [P in T[number]]: P
}

```

## First of Array

배열(튜플) T를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

```ts
//예시
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

//답
type First<T extends any[]> = T extends [] ? never : T[0];
배열의 empty 여부 확인해야함.
반환할 배열값이 없으면 never 리턴

type First<T extends any[]> = T extends [infer P, ...any] ? P : never;

```

## Length of Tuple

배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

```ts
// 예시
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla>  // expected 4
type spaceXLength = Length<spaceX> // expected 5

//답
type Length<T extends Readonly<any[]>> = T['length']

tuple 타입을 선언할 때 각 요소 자리에 다른 타입이 들어갈 수 없으므로 readonly를 수식해준다.
배열이 들어와야 하므로, extends any[] 로 타입을 제한해준다.
T['length'] 로 타입의 길이를 가져올 수 있다.
```

## Exclude

T에서 U에 할당할 수 있는 타입을 제외하는 내장 제네릭 `Exclude<T, U>`를 이를 사용하지 않고 구현하세요.

```ts
// 예시
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// 답
type MyExclude<T, U> = T extends U ? never : T;

`T extends U`는 union으로 들어온 T 타입 (ex: "a" | "b" | "c")을 하나씩 체크.
U와 타입이 같으면 never, 아무것도 없는 타입이기 때문에 아무것도 남지 않는다.
U와 타입이 다르면 T 자신을 보낸다.
```

## Awaited

Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

예를들어 Promise`<ExampleType>`이 있을 때, ExampleType을 어떻게 얻을 수 있을까요?

```js
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer P>
? P extends PromiseLike<any>
  ? MyAwaited<P>
  : P
:T;
```

```ts
type MyAwaited<T extends PromiseLike<any>> = 
  T extends PromiseLike<infer PromiseType>
    ? Awaited<PromiseType> 
    : T
  ;
```