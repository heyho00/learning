# Observer

## 관찰 가능 객체를 사용하여 이벤트 발생 시 구독자에게 알림

```js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

```js
// notify 메서드로 data를 받게되는 logger, toastify function.

import { ToastContainer, toast } from "react-toastify";

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  function handleClick() {
    observable.notify("User clicked button!");
  }

  function handleToggle() {
    observable.notify("User toggled switch!");
  }
  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
      <ToastContainer />
    </div>
  );
}
```

- observable pattern을 사용하는 인기있는 라이브러리는 RxJS

- 관찰자가 너무 복잡해지면 모든 구독자에게 알릴 때 성능 문제가 발생할 수 있다.
