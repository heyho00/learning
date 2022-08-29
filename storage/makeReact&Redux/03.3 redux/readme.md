```jsx
function createStore() {
  let state;

  return state;
}

const store = createStore();
```

이런 형태는 문제가 있다.
상태를 그대로 UI까지 흘리면
상태를 컴포넌트가 직접적으로 제어하게되는 문제가 생긴다.

```jsx
function createStore() {
  let state;

worker(state)

  return (

  )
}

function worker(state){
  // do something
}

const store = createStore(worker);
```

createStore가 state를 바꿀 수 있는 도구를 외부에 제공하는 방식.

이렇게 직접적으로 호출하는것은 타이밍 이슈가 생긴다.
언제 상태를 변경할지에 대한.

```jsx
function createStore() {
  let state;

  function send() {
    worker(state);
  }
  return send;
}

function worker(state) {
  // do something
}

const store = createStore(worker);

store.send();
```

이 구조가 되면 어떤 상태를 바꿔야하면
send로 worker가 호출됨. 결국 worker에서
상태를 바꾸는 일을 한다.

그러나, 여기서 직접 상태를 바꾸면
참조무결성이 깨진다. 원천적인 문제가 또 발생하는 것.
-> 상태를 바꾸는 함수는 (worker) 새로운 상태를 반환해라. 라는 규칙

-> 입력으로 상태, 객체를 줄테니,
이 객체를 항상 deep copy해서 새로운 객체로 반환해
(link를 끊어라, 참조를 끊어라. 원천적인 사이드 이펙트를 없애라.)

```jsx
function createStore() {
  let state;

  function send() {
    state = worker(state); //overriding
  }
  return send;
}

function worker(state) {
  return { ...state }; //추가
  //스프레드는 얕은복사.
  // 원래는 깊은 복사. 여기서는 넘어간다.
}

const store = createStore(worker);

store.send();
```

어떤 상태를 바꿀지,
실제 카운트 기능을 만들어보겠다.

```jsx
function createStore() {
  let state;

  function send() {
    state = worker(state);
  }

  function getState() {
    return state;
  }

  return {
    send,
    getState,
  };
}

// function worker(state={}){ undefined 방어코드.
function worker(state = { count: 0 }) {
  return { ...state, count: state.count + 1 };
  //send 할때마다 1씩 증가
}

const store = createStore(worker);

store.send();

// 안쪽 상태를 읽고싶을땐
store.getState();

console.log(store.getState());
// {count:1}
```

지금은 한 코드안에서 getState를 쓰지만
데이터가 언제 바뀌었는지 알 수 없다.

컴포넌트가 여럿일땐 어떤 컴포넌트가 상태를 변경했는지 알아야 한다.

### 구독 발행 모델

일종의 패턴.

내가 어떤 함수를 줄테니
구독할테니 데이터가 바뀌면 그 함수를 호출해줘. 발행해줘.

```jsx
function createStore() {
  let state;
  let handlers = [];

  function send() {
    state = worker(state);
    //데이터가 바뀌는 부분에서
    handlers.forEach((handler) => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return {
    send,
    getState,
    subscribe,
  };
}

function worker(state = { count: 0 }) {
  // ..do something
  return { ...state, count: state.count + 1 };
}

const store = createStore(worker);

store.subscribe(function () {
  console.log(store.getState());
});

store.send();
store.send();
```

send 호출부분이 문제다.
worker에다가 뭘 바꿀꺼야, 하는게 send인데
뭘 바꿀건지 안알려주고있다.

action이라는 박스가 worker한테 전해주는 뭘 바꿔 라고하는 힌트를 담고있는 객체.
액션을 받아야 함.
리덕스가 만들어놓은 일종의 컨벤션.

worker의 두번째 인자로 액션 객체를 주는게 규격.

```jsx
function createStore() {
  let state;
  let handlers = [];

  function send(action) {
    state = worker(state, action);
    //데이터가 바뀌는 부분에서
    handlers.forEach((handler) => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return {
    send,
    getState,
    subscribe,
  };
}

function worker(state = { count: 0 }, action) {
  // ..do something
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1 };
    default: //내가 모르는 타입이 들어왔어
      return { ...state };
  }
}

const store = createStore(worker);

store.subscribe(function () {
  console.log(store.getState());
});

store.send(action);
// send에 넘겨주는 액션객체
// 타입이 꼭 들어가야한다는 약속.
store.send({ type: "increase" });
store.send({ type: "increase" });
```

여기서 redex가 제안하는 작은 구조적인 약속이있다.
이런 모습이면 좋을 것 같애.
타입이 꼭 들어가야한다는 약속.
