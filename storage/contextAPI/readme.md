# Context란?

리액트 컴포넌트간에 값을 공유할 수 있게 해주는 기능.
주로 전역적으로 필요한 값을 다룰때 사용하며 꼭 전역적일 필요는 없다.
단순하게는 '컴포넌트에서 props가 아닌 또 다른 방식으로 값을 전달하는 방법이다'라고 접근할 수 있다.

<br>

## context 사용법

```jsx
import { createContext, useContext } from "react";
const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value="Hello World">
      <GrandParent />
    </MyContext.Provider>
  );
}

function GrandParent() {
  return <Parent />;
}

function Parent() {
  return <Child />;
}

function Child() {
  return <GrandChild />;
}

function GrandChild() {
  return <Message />;
}

function Message() {
  const value = useContext(MyContext);
  return <div>Received: {value}</div>;
}

export default App;
```

```jsx
import { createContext, useContext } from "react";
const MyContext = createContext();

function App() {
  return (
    <MyContext.Provider value="Hello World">
      <AwesomeComponent />
    </MyContext.Provider>
  );
}

function AwesomeComponent() {
  return (
    <div>
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
    </div>
  );
}

function FirstComponent() {
  const value = useContext(MyContext);
  return <div>First Component says: "{value}"</div>;
}

function SecondComponent() {
  const value = useContext(MyContext);
  return <div>Second Component says: "{value}"</div>;
}

function ThirdComponent() {
  const value = useContext(MyContext);
  return <div>Third Component says: "{value}"</div>;
}

export default App;
```
