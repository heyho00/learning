# Factory

## 객체를 생성하기 위해 팩토리 함수 사용

new를 사용하지않고 새 객체를 만든다.

```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`
  },
})

const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
})

const user2 = createUser({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
})

console.log(user1)
console.log(user2)
```

<br>

팩토리 패턴을 사용하면 사용자 정의 key와 value를 포함하는 새 개체를 쉽게 만들 수 있다.

```js
const createObjectFromArray = ([key, value]) => ({
  [key]: value,
})

createObjectFromArray(["name", "John"]) // { name: "John" }
```

그러나 대부분의 경우 새 개체 대신 새 인스턴스를 만드는게 메모리 효율적일 수 있다고한다.;

```js
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
})

const user2 = new User({
  firstName: "Jane",
  lastName: "Doe",
  email: "jane@doe.com",
})
```
