# TypeScript Challenges

https://github.com/type-challenges/type-challenges

## Pick

```ts
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
```

## Readonly

```ts

type MyReadonly<T> = { readonly [P in keyof T] : T[P] }

```

## Tuple to Object

```ts
type TupleToObject<T extends readonly (string|number)[]> = {
  [K in T[number]]:K
}

type TupleToObject<T extends readonly PropertyKey[]> = {
    [P in T[number]]: P
}

```
