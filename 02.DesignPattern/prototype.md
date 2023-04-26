# Prototype

## 동일한 형식의 여러 객체 간에 property를 공유하는 패턴.

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}

const dog1 = new Dog("Daisy");
const dog2 = new Dog("Max");
const dog3 = new Dog("Spot");

console.log(Dog.prototype);
// constructor: ƒ Dog(name) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name) bark: ƒ bark()

Dog.prototype.play = () => console.log("Playing now!");
dog1.play(); // 'Playing now!'
```

또 다른 유형의 개, 슈퍼 개를 만들어 보자!

이 개는 Dog에서 모든 것을 물려받아야 하지만 날 수도 있어야 한다.

클래스를 확장하고 메서드를 추가하여 슈퍼 개를 만들 수 있다.

```js
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}
```

프로토 타입체인이라고 불리는 이유가 명확해진다.

객체에서 직접 사용할 수 없는 속성에 액세스 하려고 하면 JavaScript는 속성을 찾을 때까지 가리키는 모든 객체를 재귀적으로 걸어간다.

<br>

## Object.create

이 메서드를 사용하면 프로토타입의 값을 명시적으로 전달할 수 있는 새 객체를 만들 수 있다.

내부 프로퍼티로 전달되는게 아니라 프로토타입으로 전달된다는 의미인 듯.

자체에는 속성이 없지만 프로토타입 체인의 속성에 액세스 한다는.

```js
const dog = {
  bark() {
    console.log(`Woof!`);
  },
};

const pet1 = Object.create(dog);

pet1.bark(); // Woof!
console.log("Direct properties on pet1: ", Object.keys(pet1));
console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));

// Direct properties on pet1: []
// Properties on pet1's prototype: (1) ["bark"]
```

프로토타입 패턴을 사용하면 객체가 다른 객체에 액세스하고 속성을 상속하도록 할 수 있다.

프로토타입 체인을 사용하면 객체 자체에 직접 정의되지 않은 속성에 액세스할 수 있으므로 메서드와 속성의 중복을 피할 수 있어 사용되는 메모리 양을 줄일 수 있다.
