# Proxy

## Intercept and control interactions to target objects

## 대상 객체와 직접 상호 작용하는 대신 Proxy객체와 상호작용하는 패턴.

대상 개체에 대한 상호 작용 가로채기 및 제어

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {});
```

Proxy의 두번째 인수는 핸들러를 나타내는 객체.

핸들러 객체에서 상호작용 유형에 따라 특정 동작을 정의할 수 있다.

가장 일반적인 방법은 get, set이다.

- get
  속성에 액세스 하려고 할 때 호출된다.

- set
  속성을 수정하려고 할 때 호출된다.

<br>

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
  },
});

personProxy.name;
personProxy.age = 43;

// The value of name is John Doe
// Changed age from 42 to 43
```

프록시는 유효성 검사를 추가하는 데 유용할 수 있다.
사용자는 사람의 나이를 문자열 값으로 변경하거나 빈 이름을 지정할 수 없어야 한다.
또는 사용자가 존재하지 않는 개체의 속성에 액세스하려는 경우 사용자에게 알려야 한다.

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(
        `Hmm.. this property doesn't seem to exist on the target object`
      );
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
  },
});

personProxy.nonExistentProperty;
personProxy.age = "44";
personProxy.name = "";

// Hmm.. this property doesn't seem to exist
// Sorry, you can only pass numeric values for age.
// You need to provide a valid name.
```

<br>

obj[prop]를 통해 속성에 액세스하거나 obj[prop] = value를 통해 속성을 설정하는 대신 JS 내장 객체를 이용해 대상 객체를 더 쉽게 조작할 수 있다.

Reflect.get() 및 Reflect.set()을 통해 대상 객체의 속성에 액세스하거나 수정할 수 있다.

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    Reflect.set(obj, prop, value);
  },
});
```

<br>

프록시는 객체의 동작에 대한 제어를 추가하는 강력한 방법.

(유효성 검사, 형식 지정, 알림 또는 디버깅)3

Proxy 개체를 과도하게 사용하거나 각 처리기 메서드 호출에 대해 과중한 작업을 수행하면 응용 프로그램의 성능에 쉽게 부정적인 영향을 줄 수 있다.

성능이 중요한 코드에는 프록시를 사용하지 않는 것이 가장 좋다.
