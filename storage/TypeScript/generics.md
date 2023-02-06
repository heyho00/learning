# about TypeScript

## Call Signatures

```jsx
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

<br>

---

## Polymorphism

### Generic

generic이란 타입의 placeholder 같은것.

call signature를 작성할 때, 들어올 확실한 타입을 모를 때 generic을 사용.

```jsx
type SuperPrint = {
    (arr:number[]):void
    (arr:boolean[]):void
    (arr:string[]):void
}

const superPrint : SuperPrint= (arr) => {
    arr.forEach(i => console.log(i))
}s

suerPrint([1,2,3,4])
```

먼저, 타입스크립트한테 제네릭을 쓰겠다고 알려준다.

```jsx
// type SuperPrint = {
//     <T>(arr:T[]):void

// }

// const superPrint : SuperPrint= (arr) => {
//     arr.forEach(i => console.log(i))
// }

// superPrint([1,2,3,4])
// superPrint([true, false, true])
// superPrint([true, false, 'hihi'])

type SuperPrint = {
  <T>(arr: T[]): T,
};

const superPrint: SuperPrint = (arr) => arr[0];

superPrint([1, 2, 3, 4]);
superPrint([true, false, true]);
superPrint([true, false, "hihi"]);
```

<br>

---

<br>

## Generics

여러 generic을 쓸 수 있다.

```jsx
type SuperPrint = {
  <T, M>(a: T[], b: M): void,
};

const superPrint: SuperPrint = (arr) => {
  arr.forEach((i) => console.log(i));
};

superPrint([1, 2, 3, 4], "");
superPrint([true, false, true], "sg");
superPrint([true, false, "hihi"], 43);
```

<br>

---

<br>

```jsx
type SuperPrint = <T>(a: T[]) => T;

const superPrint: SuperPrint = (a) => a[0];

superPrint([1, 2, 3, 4], "");
superPrint([true, false, true], "sg");
superPrint([true, false, "hihi"], 43);
```

이런 모습이 무서웠다면 ..아래와 같이 쓸 수 있다.

```jsx
function superPrint<V>(a: V[]) {
  return a[0];
}

superPrint < boolean > [1, 2, 3, 4];
// 이렇게 하면 에러남. boolean 타입을 overload ..
// 타입스크립트가 스스로 이게 어떤 타입인지 찾게하는 것이 항상 제일 좋다.

superPrint([true, false, true]);
superPrint([true, false, "hihi"]);
```

<br>

## 타입의 재사용

```jsx
type Player<E> = {
    name: string
    extraInfo: E
}

const harry: Player<{favFood:string}>={
    name: 'harry',
    extraInfo:{
        favFood:'kimchi'
    }
}


 // 이것은 아래와 같다.


type Player<E> = {
    name: string
    extraInfo: E
}

type HarryPlayer = Player<{favFood:string}>

const harry: HarryPlayer={
    name: 'harry',
    extraInfo:{
        favFood:'kimchi'
    }
}


// 또, 이렇게도 가능.


type Player<E> = {
    name: string
    extraInfo: E
}

type HarryExtra ={
    favFood:string;
}
type HarryPlayer = Player<HarryExtra>

const harry: HarryPlayer={
    name: 'harry',
    extraInfo:{
        favFood:'kimchi'
    }
}

const delaila: Player<null>={
    name:'delaila',
    extraInfo:null
}

```

type 재사용을 할 수 있다.
