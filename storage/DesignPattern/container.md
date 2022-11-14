# Container/Presentational Pattern

## 응용 프로그램의 logic과 View를 분리하는 패턴.

react에서 관심사 분리를 시행하는 한 가지 방법.

1. Presentational Components : 데이터가 사용자에게 표시되는 방식을 고려하는 구성 요소. 예제에서는 개 이미지 목록을 렌더링한다.

2. Container Components : 사용자에게 표시되는 데이터를 중요하게 생각하는 구성 요소. 예제에서는 개 이미지를 가져옴.

<br>

## Presentational Component

```js
import React from "react";

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

## Container Component

자체적인 렌더링은 없다.

```js
import React from "react";
import DogImages from "./DogImages";

export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: [],
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((res) => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

<br>

## hook

```js
export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then((res) => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}
```

```js
import React from "react";
import useDogImages from "./useDogImages";

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```
