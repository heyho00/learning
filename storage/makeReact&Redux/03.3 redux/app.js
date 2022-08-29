function createStore() {
  let state;
  let handlers = [];

  function send() {
    state = worker(state);
    // 상태 바뀌는 부분에서
    handlers.forEach((handler) => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return {
    send,
    getState,
    subscribe,
  };
}

function worker(state = { count: 0 }) {
  // ..do something
  return { ...state, count: state.count + 1 };
}

const store = createStore(worker);

store.subscribe(function () {
  console.log(store.getState());
});

store.send();
store.send();
store.send();
