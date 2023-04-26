# Singleton

## Share a single global instance throughout our application.

## 단일 전역 인스턴스를 공유하는 패턴.

한 번 인스턴스화할 수 있고 전역적으로 액세스할 수 있는 클래스.
일반적으로 목표는 전역 응용 프로그램 상태를 관리하는 것.

```jsx
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

위 클래스는 싱클톤의 기준에 맞지않다.
한번만 인스턴스화할 수 있어야 하기 때문.

인스턴스를 하나만 만들 수 있도록 하는 한가지 방법은
instance라는 변수를 만드는 것.

```jsx
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
// Error: You can only create one instance!
```

<br>

파일에서 인스턴스를 내보낼때 인스턴스도 freeze 해야한다.
고정된 인스턴스의 속성이 추가되거나 수정될 수 없도록.

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

redbtn, bluebtn 컴포넌트 중 한곳에서 increment 메서드를 호출하면
Counter 인스턴스의 counter속성 값이 두 파일 모두에서 업데이트 되도록 한다.

동일한 값이 모든 인스턴스에서 공유된다.

---

인스턴스화를 한 인스턴스로만 제한하면 잠재적으로 많은 메모리 공간을 절약할 수 있다.

그러나 싱글톤은 실제로 안티 패턴으로 간주된다.
전역 변수와 거의 동일한 장단점을 가지고 있으며 매우 편리하지만 코드의 모듈성을 깨뜨린다.

```js
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  },
};

Object.freeze(counter);
export { counter };
```

객체가 참조로 전달되기 때문에 redbtns, bluebtns는 모두 동일한 카운터 개체에 대한 참조를 가져온다.
한 곳에서 count값을 수정하면 두 파일 모두에서 볼 수 있는 count값이 수정된다.

<br>

## State management in React

react에서는 singleton을 사용하는 대신 Redux 또는 React Context와 같은 상태 관리 도구를 통해 전역 상태에 의존하는 경우가 많다.

전역 상태 동작이 Singleton의 동작과 유사해 보일 수 있지만 이러한 도구는 Singleton의 `변경 가능한 상태가 아닌 읽기 전용 상태를 제공`한다. Redux를 사용할 때 구성 요소가 디스패처를 통해 작업을 보낸 후 순수 함수 리듀서만 상태를 업데이트할 수 있다.

전역 상태의 단점은 이러한 도구를 사용한다고해서 다 사라지지 않지만, 구성 요소가 상태를 직접 업데이트할 수 없기 때문에 최소한 전역 상태가 의도한 대로 변경되도록 할 수 있다.
