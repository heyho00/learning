# Provider

앱의 거의 모든 구성 요소가 props에 액세스 해야하는 경우,

prop drilling을 없애 계층을 건너뛰어 props에 액세스 가능하게 하는 패턴.

```js
const DataContext = React.createContext()

function App() {
  const data = { ... }

  return (
    <div>
      <DataContext.Provider value={data}>
        <SideBar />
        <Content />
      </DataContext.Provider>
    </div>
  )
}


const SideBar = () => <List />
const List = () => <ListItem />
const Content = () => <div><Header /><Block /></div>


function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
```

useContext 훅을 이용해 데이터를 읽고 쓸 수 있다.

구성 요소를 구성 요소로 직접 래핑하는 대신 구성 요소를 래핑하여 값을 제공하는 HOC를 만들 수 있다.

이렇게 하면 컨텍스트 논리를 렌더링 구성 요소에서 분리하여 provider의 재사용성을 향상시킬 수 있다.

```js
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const providerValue = {
    theme: themes[theme],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider>
        <Toggle />
        <List />
      </ThemeProvider>
    </div>
  );
}
```

<br>

## Cons

경우에 따라 Provider 패턴을 과도하게 사용하면 성능 문제가 발생할 수 있다. 컨텍스트를 사용하는 모든 구성 요소는 각 상태 변경에 대해 다시 렌더링됩니다.
