# TypeScript Challenges

<https://github.com/type-challenges/type-challenges>

## Pick

T에서 K 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 Pick<T, K>을 이를 사용하지 않고 구현하세요.

```ts
// 예시
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// 답
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
```

## Readonly

T의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

```ts
// 예시
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property

//답
type MyReadonly<T> = { readonly [P in keyof T]: T[P] };
```

## Tuple to Object

배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

```ts
//예시
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}

//답
type TupleToObject<T extends readonly (string | number)[]> = {
  [K in T[number]]: K;
};

type TupleToObject<T extends readonly PropertyKey[]> = {
  [P in T[number]]: P;
};
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
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer P>
  ? P extends PromiseLike<any>
    ? MyAwaited<P>
    : P
  : T;
```

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<
  infer PromiseType
>
  ? Awaited<PromiseType>
  : T;
```

## If

조건 C가 참일 때 반환하는 타입 T, 거짓일 때 반환하는 타입 F를 받는 타입 If를 구현하세요.

C는 true 또는 false이고, T와 F는 아무 타입입니다. (3항 연산자임)

예시 :

```js
// 예시
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'
```

```js
// 답
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## concat

JavaScript의 Array.concat 함수를 타입 시스템에서 구현하세요.

타입은 두 인수를 받고, 인수를 왼쪽부터 concat한 새로운 배열을 반환해야 합니다.

예시 :

```js
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

오답 :

```js
type Concat<T, U> = [...T, ...U]
```

답 :

```js
type Tuple = readonly unknown[];

type Concat<T extends Tuple, U extends Tuple> = [...T, ...U];
```

```js
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```

`<T extends any[], U extends any[]>` 이렇게 해주는 이유는 ...연산자가 런타임에서 동작하는 기능이기 때문이다. 타입 레벨에서 spread 연산자를 사용할 수 없다. !

spread 연산자가 코드가 실행될 때 동적으로 동작하는 것을 의미한다.

배열, 객체 또는 함수 호출의 인수 리스트를 확장하거나, 배열 또는 객체를 병합하는 등의

동작을 수행할 때 사용된다.

반면 타입스크립트의 타입 시스템은 컴파일 타임에 작동하며, 타입정보를 검사하고 추론한다.

그래서 spread 연산자를 직접 타입 레벨에서 사용할 수 없는 것이다.

**대신에 Tuple을 이용한다.**

`Tuple`은 배열과 유사하지만, 배열과는 달리 각 요소의 타입이 다를 수 있다.

그래서 `<T extends any[], U extends any[]>` 이렇게 제네릭 타입 매개변수

T, U가 모두 배열 타입인지 확인하고 Concat 타입이 배열 타입에만 적용될 수 있도록 제한한다.
