# StrBooleanValue

```jsx
// convertUtil.ts

export const getStringToBoolean = (s: string): boolean => (s === 'Y')
->
export const isStrValueCheck = (s?: StrBooleanValue): boolean => !!s && s === STR_BOOLEAN_VALUE.TRUE;

```

사용하는 유틸을 변경하며 StrBooleanValue 타입을 지정.

타입은 이렇다.

```jsx
// constants/types/index.ts

export type StrBooleanValue =
	typeof STR_BOOLEAN_VALUE[keyof typeof STR_BOOLEAN_VALUE];
```

```jsx
// constants/consts/index.ts

export const STR_BOOLEAN_VALUE = {
	TRUE: 'Y',
	FALSE: 'N'
} as const;
```

```jsx
// constants/interfaces/ProductInfo.ts

export interface ProductContent {
  badgeInfoList: Array<{
    badgeCode: string;
    badgeName: string;
    badgeType: string;
    badgeYn: StrBooleanValue; // 사용
    inflowSite: string;
  }>;
```

keyof typeof STR_BOOLEAN_VALUE는 “TRUE” | “FALSE”와 같은 문자열 리터럴 유니온 타입으로 해석된다.

따라서

typeof STR_BOOLEAN_VALUE[keyof typeof STR_BOOLEAN_VALUE] 는

STR_BOOLEAN_VALUE 객체의 TRUE, FALSE 속성 값의 타입인 ‘Y’ | ‘N’과 같이 해석된다.

type StrBooleanValue = ‘Y’ | ‘N’ 이렇게 되는 것.

STR_BOOLEAN_VALUE 객체의 values(타입)만 될 수 있다. 객체에 프로퍼티가 추가된다면 그것의 타입도 추가된다.

```jsx
const STR_BOOLEAN_VALUE = {
    TRUE: 'Y',
    FALSE: 'N',
    UNDEFINED:undefined
} as const;

type StrBooleanValue = typeof STR_BOOLEAN_VALUE[keyof typeof STR_BOOLEAN_VALUE];

const obj:StrBooleanValue = STR_BOOLEAN_VALUE.UNDEFINED
```
