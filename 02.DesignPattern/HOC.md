# HOC

## 재사용 가능한 논리를 응용 프로그램 구성 요소에 prop으로 전달

여러 구성 요소에서 동일한 logic을 사용할 경우.
(특정 스타일 적용, 권한 부여, 전역 상태 추가 등)
이 패턴을 사용해 구성 요소 logic을 재사용할 수 있다.

여러 구성 요소에 특정 스타일을 추가하고 싶은 경우.
매번 로컬에서 object를 만드는 대신 구성 요소에 객체를 추가하는 HOC를 만들 수 있다.

```js

function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

Element와 url을 props로 주면 데이터를 가져오는 동안엔 loading을 띄우는
HOC를 만들어보자.

```js
import React, { useEffect, useState } from "react";

export default function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
```

구성 요소에 래핑된 HOC를 내보낼 수 있다.

```js
export default withLoading(DogImages);
```

최종.

```js
import React from "react";
import withLoader from "./withLoader";

function DogImages(props) {
  return props.data.message.map((dog, index) => (
    <img src={dog} alt="Dog" key={index} />
  ));
}

export default withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);
```

HOC는 여러 구성 요소에 동일한 논리를 제공하면서 모든 논리를 한 곳에 유지할 수 있다.

중첩도 가능하다.

```js
import React from "react";
import withLoader from "./withLoader";
import withHover from "./withHover";

function DogImages(props) {
  return (
    <div {...props}>
      {props.hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default withHover(
  withLoader(DogImages, "https://dog.ceo/api/breed/labrador/images/random/6")
);
```

<br>

## Hooks

구성 요소를 래핑하는 대신 요소 내에서 직접 후크를 사용할 수 있다.

```js
import { useState, useRef, useEffect } from "react";

export default function useHover() {
  const [hovering, setHover] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => setHover(true);
  const handleMouseOut = () => setHover(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, hovering];
}


//////////////

import React from "react";
import withLoader from "./withLoader";
import useHover from "./useHover";

function DogImages(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}

export default withLoader(
  DogImages,
  "https://dog.ceo/api/breed/labrador/images/random/6"
);
```

HOC를 사용하면 여러 구성 요소에 동일한 논리를 제공하는 동시에 해당
논리를 모두 한 곳에 유지할 수 있다고 했다.
훅은 구성 요소 내에서 사용자 지정 동작을 추가할 수 있으므로 여러 구성요소가
이 동작에 의존하는 경우 HOC패턴에 비해 버그 발생 위험이 증가할 수 있다.

<br>

#### HOC를 위한 최상의 사용 사례:

동일한 동작을 응용 프로그램 전체의 여러 구성 요소에서 사용해야할 때.
구성 요소는 추가된 사용자 지정 논리 없이 독립 실행형으로 작동할 수 있다.

#### 후크에 대한 최상의 사용 사례:

동작은 이를 사용하는 각 구성 요소에 대해 사용자 지정해야 한다.
동작은 응용 프로그램 전체에 분산되지 않으며 하나 또는 몇 개의 구성 요소만 동작을 사용한다.
이 동작은 구성 요소에 많은 속성을 추가한다.

<br>

[HOC와Hook](https://ostarblog.tistory.com/12)
