# Command

## 명령자에게 명령을 보내 작업을 실행하는 메서드를 분리합니다.

특정 작업을 실행하는 객체를 메서드를 호출하는 객체와 분리할 수 있다.

```js
class OrderManager() {
  constructor() {
    this.orders = []
  }

  placeOrder(order, id) {
    this.orders.push(id)
    return `You have successfully ordered ${order} (${id})`;
  }

  trackOrder(id) {
    return `Your order ${id} will arrive in 20 minutes.`
  }

  cancelOrder(id) {
    this.orders = this.orders.filter(order => order.id !== id)
    return `You have canceled your order ${id}`
  }
}


const manager = new OrderManager();

manager.placeOrder("Pad Thai", "1234");
manager.trackOrder("1234");
manager.cancelOrder("1234");
```

인스턴스에서 직접 메서드를 호출하는데는 단점이 있다.

나중에 특정 메서드의 이름을 바꾸기로 하거나 메서드의 기능이 변경될 수 있는데, 

큰 응용 프로그램에서는 코드베이스의 어느 곳에서도 이 전 메서드를 호출하지 않도록 해야하는게 까다로울 수 있다.


대신 객체에서 메서드를 분리하고 각 명령에 대해 별도의 명령 함수를 만들려고 한다.

placeOrder, trackOrder, cancelOrder 대신 execute라는 메서드 하나만 갖게 할 것이다.

```js
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}


class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command(orders => {
    orders.push(id);
    return `You have successfully ordered ${order} (${id})`;
  });
}

function CancelOrderCommand(id) {
  return new Command(orders => {
    orders = orders.filter(order => order.id !== id);
    return `You have canceled your order ${id}`;
  });
}

function TrackOrderCommand(id) {
  return new Command(() => `Your order ${id} will arrive in 20 minutes.`);
}


const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

command 패턴을 사용하면 작업을 실행하는 객체에서 메서드를 분리할 수 있다.

특정 수명이 있는 명령 또는 특정 시간에 큐에 대기하고 실행해야 하는 명령을 처리하는 경우 더 많은 제어를 제공한다.

but,

명령 패턴의 사용 사례는 매우 제한적이며 종종 응용 프로그램에 불필요한 상용구를 추가할 수 있다.