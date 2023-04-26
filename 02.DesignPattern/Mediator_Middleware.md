# Mediator/Middleware

## 중앙 중재자 객체를 사용하여 구성요소 간의 통신 처리

JavaScript에서 mediator는 종종 객체 리터럴 또는 함수에 지나지 않습니다.
이 패턴을 항공 교통 관제사와 조종사 간의 관계와 비교할 수 있는데,
조종사가 서로 직접 대화하는 대신 관제사와 교신, 관제사는 모든 비행기가 다른
비행기에 부딪히지 않도록 필요한 정보를 제공한다.

모든 객체가 다른 객체와 직접 통신하여 다대다 관계를 생성하는 대신
객체의 요청이 중재자에 의해 처리되는 것.

좋은 사례는 채팅방이다.
사용자는 서로 직접 대화하지 않는다. 채팅방이 사용자 간의 중재자 역할.

```js
class ChatRoom {
  logMessage(user, message) {
    const time = new Date();
    const sender = user.getName();

    console.log(`${time} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane ", chatroom);

user1.send("Hi there!");
user2.send("Hey!");
```

```js
const app = require("express")();
const html = require("./data");

app.use(
  "/",
  (req, res, next) => {
    req.headers["test-header"] = 1234;
    next();
  },
  (req, res, next) => {
    console.log(`Request has test header: ${!!req.headers["test-header"]}`);
    next();
  }
);

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from(html));
});

app.listen(8080, function () {
  console.log("Server is running on 8080");
});
```

널리 사용되는 Express.js 서버 프레임워크.
사용자가 액세스할 수 있는 특정 경로에 콜백을 추가할 수 있다.

사용자가 루트에 도달하면 요청에 헤더를 추가하는 미들웨어 콜백과
제대로 추가되었는지 확인하는 다른 미들웨어 함수이다.

하나 또는 여러 미들웨어 함수를 통해 응답까지 요청 객체를 추적, 수정할 수 있다.

<br>

미들웨어 패턴을 사용하면 모든 통신이 하나의 중앙 지점을 통해 흐르도록 하여
객체 간의 다대다 관계를 쉽게 단순화할 수 있다.
