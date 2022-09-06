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

<br><br>

## custom Hook으로 만들어 쓰는것도 좋은 방법.

```jsx
import { createContext, useContext } from "react";
const MyContext = createContext();

function useMyContext() {
  return useContext(MyContext);
}

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
  const value = useMyContext();
  return <div>First Component says: "{value}"</div>;
}

function SecondComponent() {
  const value = useMyContext();
  return <div>Second Component says: "{value}"</div>;
}

function ThirdComponent() {
  const value = useMyContext();
  return <div>Third Component says: "{value}"</div>;
}

export default App;
```

<br><br>

Provider를 깜빡해 쓰지않고 자식 컴포넌트에서 useContext를 사용하면 undefined로 조회된다.

이러한 경우 기본값을 정하고 싶다면 createContext의 인자로 넣어주면 된다.

```jsx
const MyContext = createContext("default value");
```

<br>
<br>

기본값이 아닌 에러를 띄워 개발자가 고치도록 하고 싶다면..

<br><br>

## context에서 상태관리가 필요한 경우

```jsx
function App() {
  return (
    <div>
      <Value />
      <Buttons />
    </div>
  );
}

function Value() {
  return <h1>1</h1>;
}
function Buttons() {
  return (
    <div>
      <button>+</button>
      <button>-</button>
    </div>
  );
}

export default App;
```

#### context에서 유동적인 값을 관리하는 경우엔 Provider를 새로 만들어주는 것이 좋다.

```jsx
import { createContext, useState } from "react";

const CounterContext = createContext();

function CounterProvider({ children }) {
  const counterState = useState(1);

  return (
    <CounterContext.Provider value={counterState}>
      {children}
    </CounterContext.Provider>
  );
}

function App() {
  return (
    <CounterProvider>
      <div>
        <Value />
        <Buttons />
      </div>
    </CounterProvider>
  );
}

// (...)
```

#### 그 다음, useCounterState라는 커스텀 Hook을 만들 수 있다.

```jsx
import { createContext, useContext, useState } from "react";

// (...)

function useCounterState() {
  const value = useContext(CounterContext);
  if (value === undefined) {
    throw new Error("useCounterState should be used within CounterProvider");
  }
  return value;
}
```

<br>

이렇게 Hook을 만들면, `CounterProvider` 의 자식 컴포넌트 어디서든지 `useCoutnerState` 를 사용하여 값을 조회하거나 변경할 수 있다.

```jsx
function Value() {
  const [counter] = useCounterState();
  return <h1>{counter}</h1>;
}

function Buttons() {
  const [, setCounter] = useCounterState();
  const increase = () => setCounter((prev) => prev + 1);
  const decrease = () => setCounter((prev) => prev - 1);

  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default App;
```

<br>
<br>

여기서 만약 데이터를 어떻게 업데이트할지에 대한 로직을 컴포넌트가 아닌 Provider 단에서 구현하고 싶으면 다음과 같이 작성한다.

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const CounterContext = createContext();

function CounterProvider({ children }) {
  const [counter, setCounter] = useState(1);
  const actions = useMemo(
    () => ({
      increase() {
        setCounter((prev) => prev + 1);
      },
      decrease() {
        setCounter((prev) => prev - 1);
      },
    }),
    []
  );

  const value = useMemo(() => [counter, actions], [counter, actions]);

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

function useCounter() {
  const value = useContext(CounterContext);
  if (value === undefined) {
    throw new Error("useCounterState should be used within CounterProvider");
  }
  return value;
}

function App() {
  return (
    <CounterProvider>
      <div>
        <Value />
        <Buttons />
      </div>
    </CounterProvider>
  );
}

function Value() {
  const [counter] = useCounter();
  return <h1>{counter}</h1>;
}

function Buttons() {
  const [, actions] = useCounter();

  return (
    <div>
      <button onClick={actions.increase}>+</button>
      <button onClick={actions.decrease}>-</button>
    </div>
  );
}

export default App;
```

actions라는 객체를 만들어 그 안에 변화를 일으키는 함수들을 넣었다.
그리고 컴포넌트가 리렌더링 될 때마다 함수를 새로 만드는게 아니라 처음에 한번 만들고 그 이후 재사용할 수 있도록 useMemo로 감싸주었다.

value에 값을 넣어주기 전에 [counter, action]을 useMemo로 한번 감싸줬다.

-> useMemo로 감싸주지 않으면 CounterProvider가 리렌더 될 때마다 새로운 배열을 만들기 때문에 useContext를 사용하는 컴포넌트 쪽에서 context의 값이 바뀐 것으로 간주하게 되어 낭비 렌더링이 발생한다.

물론 지금의 경우엔 CounterProvider가 App에서 최상위 컴포넌트이기 때문에 큰 의미가 없는 최적화이긴 하지만 평상시에 이러한 습관을 가지는게 앞으로 개발할 때 도움이 된다.

<br><br>

#### 값과 업데이트 함수를 두개의 Context로 분리하기

상태가 빈번하게 업데이트 된다면,
실제 변화가 반영되는 곳은 Value 컴포넌트 뿐이지만 Buttons 컴포넌트도 리렌더링 되기 때문에 성능적으로 좋지않다.

이를 고치기 위해 context 하나를 더 만든다.

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const CounterValueContext = createContext();
const CounterActionsContext = createContext();

function CounterProvider({ children }) {
  const [counter, setCounter] = useState(1);
  const actions = useMemo(
    () => ({
      increase() {
        setCounter((prev) => prev + 1);
      },
      decrease() {
        setCounter((prev) => prev - 1);
      },
    }),
    []
  );

  return (
    <CounterActionsContext.Provider value={actions}>
      <CounterValueContext.Provider value={counter}>
        {children}
      </CounterValueContext.Provider>
    </CounterActionsContext.Provider>
  );
}

function useCounterValue() {
  const value = useContext(CounterValueContext);
  if (value === undefined) {
    throw new Error("useCounterValue should be used within CounterProvider");
  }
  return value;
}

function useCounterActions() {
  const value = useContext(CounterActionsContext);
  if (value === undefined) {
    throw new Error("useCounterActions should be used within CounterProvider");
  }
  return value;
}

function App() {
  return (
    <CounterProvider>
      <div>
        <Value />
        <Buttons />
      </div>
    </CounterProvider>
  );
}

function Value() {
  console.log("Value");
  const counter = useCounterValue();
  return <h1>{counter}</h1>;
}
function Buttons() {
  console.log("Buttons");
  const actions = useCounterActions();

  return (
    <div>
      <button onClick={actions.increase}>+</button>
      <button onClick={actions.decrease}>-</button>
    </div>
  );
}

export default App;
```

이렇게 하면 버튼을 눌러 상태가 변할때 Value 컴포넌트에서만 리렌더가 발생.

<br><br>

## context의 상태에서 배열이나 객체를 다루는 경우

```jsx
const ModalValueContext = createContext();
const ModalActionsContext = createContext();

function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    visible: false,
    message: "",
  });

  const actions = useMemo(
    () => ({
      open(message) {
        setModal({
          message,
          visible: true,
        });
      },
      close() {
        setModal((prev) => ({
          ...prev,
          visible: false,
        }));
      },
    }),
    []
  );

  return (
    <ModalActionsContext.Provider value={actions}>
      <ModalValueContext.Provider value={modal}>
        {children}
      </ModalValueContext.Provider>
    </ModalActionsContext.Provider>
  );
}

function useModalValue() {
  const value = useContext(ModalValueContext);
  if (value === undefined) {
    throw new Error("useModalValue should be used within ModalProvider");
  }
  return value;
}

function useModalActions() {
  const value = useContext(ModalActionsContext);
  if (value === undefined) {
    throw new Error("useModalActions should be used within ModalProvider");
  }
  return value;
}
```

원하는 곳에서 모달을 띄울 수 있다.

```jsx
const { open } = useModalActions();

const handleSomething = () => {
  open("안녕하세요!");
};
```

<br>

#### 할 일 목록같은 배열을 다룬다면?

```jsx
import { createContext, useContext, useMemo, useRef, useState } from "react";

const TodosValueContext = createContext();
const TodosActionsContext = createContext();

function TodosProvider({ children }) {
  const idRef = useRef(3);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "밥먹기",
      done: true,
    },
    {
      id: 2,
      text: "잠자기",
      done: false,
    },
  ]);

  const actions = useMemo(
    () => ({
      add(text) {
        const id = idRef.current;
        idRef.current += 1;
        setTodos((prev) => [
          ...prev,
          {
            id,
            text,
            done: false,
          },
        ]);
      },
      toggle(id) {
        setTodos((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  done: !item.done,
                }
              : item
          )
        );
      },
      remove(id) {
        setTodos((prev) => prev.filter((item) => item.id !== id));
      },
    }),
    []
  );

  return (
    <TodosActionsContext.Provider value={actions}>
      <TodosValueContext.Provider value={todos}>
        {children}
      </TodosValueContext.Provider>
    </TodosActionsContext.Provider>
  );
}

function useTodosValue() {
  const value = useContext(TodosValueContext);
  if (value === undefined) {
    throw new Error("useTodosValue should be used within TodosProvider");
  }
  return value;
}

function useTodosActions() {
  const value = useContext(TodosActionsContext);
  if (value === undefined) {
    throw new Error("useTodosActions should be used within TodosProvider");
  }
  return value;
}
```

#### 할 일 추가

```jsx
const { add } = useTodosActions();

const handleSubmit = () => {
  add(text);
};
```

#### 각 항목 보여주기

```jsx
const { toggle, remove } = useTodosActions();

const handleToggle = () => {
  toggle(id);
};

const handleRemove = () => {
  remove(id);
};
```

# Context가 꼭 전역적이어야 한다는 생각을 버리자.

꼭 전역적일 필요 없이 재사용성이 높은 컴포넌트를 만들때도 매우 유용하다.

```jsx
import { useState } from "react";

function Item({ active, children, onClick }) {
  const activeStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const style = {
    cursor: "pointer",
    padding: "1rem",
  };
  return (
    <div
      style={active ? { ...style, ...activeStyle } : style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeId, setActiveId] = useState(1);
  return (
    <div>
      <Item active={activeId === 1} onClick={() => setActiveId(1)}>
        Hello
      </Item>
      <Item active={activeId === 2} onClick={() => setActiveId(2)}>
        World
      </Item>
      <Item active={activeId === 3} onClick={() => setActiveId(3)}>
        React
      </Item>
    </div>
  );
}

export default App;
```

<br>

항목들을 JSX로 표현하고 싶고, 반복되는 코드들을 정리해주고 싶다면, 이 또한 Context를 사용하여 쉽게 해결할 수 있다.

```jsx
import { createContext, useContext, useMemo, useState } from "react";

const ItemGroupContext = createContext();
function ItemGroup({ children, activeId, onSelect }) {
  const value = useMemo(
    () => ({
      activeId,
      onSelect,
    }),
    [activeId, onSelect]
  );
  return (
    <ItemGroupContext.Provider value={value}>
      {children}
    </ItemGroupContext.Provider>
  );
}
function useItemGroup() {
  const value = useContext(ItemGroupContext);
  if (value === undefined) {
    throw new Error("Item component should be used within ItemGroup");
  }
  return value;
}

function Item({ children, id }) {
  const activeStyle = {
    backgroundColor: "black",
    color: "white",
  };
  const style = {
    cursor: "pointer",
    padding: "1rem",
  };
  const { activeId, onSelect } = useItemGroup();
  const active = activeId === id;
  const onClick = () => onSelect(id);
  return (
    <div
      style={active ? { ...style, ...activeStyle } : style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeId, setActiveId] = useState(1);
  const [anotherActiveId, setAnotherActiveId] = useState(4);

  return (
    <div>
      <ItemGroup activeId={activeId} onSelect={setActiveId}>
        <Item id={1}>Hello</Item>
        <Item id={2}>World</Item>
        <Item id={3}>React</Item>
      </ItemGroup>
      <hr />
      <ItemGroup activeId={anotherActiveId} onSelect={setAnotherActiveId}>
        <Item id={4}>Bye</Item>
        <Item id={5}>World</Item>
        <Item id={6}>Context</Item>
      </ItemGroup>
    </div>
  );
}

export default App;
```

필요한 값과 함수를 매번 Props로 넣어주는 대신, ItemGroup 이라는 Provider 컴포넌트를 만들어서 해당 컴포넌트에만 한번 넣어주고 Item 에서 Context를 읽어와서 값을 사용하도록 만들었다.

전체적인 코드는 조금 늘었지만,
Item 코드를 사용하는 쪽에서는 훨씬 가독성 높고 편하게 작성할 수 있고 재사용성 또한 좋아졌다.

이렇게 context를 꼭 전역적인 값을 위해서만 쓰는게 아니라,
Props가 아닌 또 다른 방식으로 데이터를 전달하는 것이라는 접근으로 사용할 수 있다.

<br>

## 상태관리 라이브러리와의 차이

과거에는 context가 굉장히 불편해서 전역 상태 관리 라이브러리를 사용하는것이 당연시 됐으나, 현재는 편해져서 단순히 전역적인 상태관리를 위함이라면 필요가 없다.

단, 상태 관리 라이브러리와 context는 완전히 별개의 개념임을 알아야 한다.

`context`는 전역 상태관리를 할 수 있는 수단일 뿐,
`상태관리 라이브러리`는 상태관리를 더욱 편하고 효율적으로 할 수 있게 해주는 기능들을 제공해주는 도구.

#### Redux의 경우

액션과 리듀서라는 개념을 사용해 사애 업데이트 로직을 컴포넌트 밖으로 분리할 수 있게 해주며, 상태가 업데이트 될 때 실제로 의존하고 있는 값이 변할때만 리렌더링 하도록 최저화 해준다.

context를 쓴다면, 각기 다른 상태마다 새롭게 context를 마들어줘야 하는데 이 과정을 생략하게 해줘 편리하다.

#### Mobx또한

상태 업데이트 로직을 컴포넌트 밖으로 분리할 수 있게 해주고 최적화도 잘 해준다.

#### Recoil, Jotai, Zustand의 경우

context를 일일이 만드는 과정을 생략하고 Hook 기반으로 아주 편하게 전역상태 관리를 할 수 있게 해준다. 최적화도 마찬가지.

결국 상태 관리를 조금 더 쉽게 하기 위해 사용하는 것.
