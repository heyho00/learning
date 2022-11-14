# Mixin

## 상속 없이 객체 또는 클래스에 기능 추가

유일한 목적은 상속없이 객체 또는 클래스에 기능을 추가하는 것이다.

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
};

Object.assign(Dog.prototype, dogFunctionality);

const pet1 = new Dog("Daisy");

pet1.name; // Daisy
pet1.bark(); // Woof!
pet1.play(); // Playing!
```

상속없이 믹스인으로 기능을 추가할 수 있지만
믹스인 자체는 상속을 사용할 수 있다.

```js
const animalFunctionality = {
  walk: () => console.log("Walking!"),
  sleep: () => console.log("Sleeping!"),
};

Object.assign(dogFunctionality, animalFunctionality);
Object.assign(Dog.prototype, dogFunctionality);
```

<br>

React 팀은 믹스인을 사용하면 구성 요소에 불필요한 복잡성이 쉽게 추가되어 유지 관리 및 재사용이 어려워지므로 믹스인 사용을 권장하지 않는다.

대신 HOC의 사용을 권장했으며, 이제는 Hooks로 대체 된다.
