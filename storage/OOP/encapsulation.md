# 캡슐화 encapsulation

객체내의 데이터를 보호하고 변경불가한 영역을 설정하여 데이터를 계속 동일한 결과를 얻도록 하는 기능.
변경 불가한 캠슐화를 아주 중요한 데이터 이용 패턴으로 채택하곤 하지만
데이터 변형이 필요한 시점에는 무시되기도..

<br>

**case1**

```jsx
const Cat = function (arg) {
  let name = arg ? arg : "veri";

  this.getName = function () {
    return name;
  };
  this.setName = function (arg) {
    name = arg;
  };
};

const myCat = new Cat();
myCat.name; //undefined
myCat.getName(); //veri
myCat.setName("arthur");
myCat.getName(); //arthur
```

**case2**

```jsx
const Cat = function (arg) {
  let name = arg ? arg : "veri";

  return {
    getName: function () {
      return name;
    },
    setName: function (arg) {
      name = arg;
    },
  };
};

const myCat = new Cat("");
myCat.name; //undefined
myCat.getName(); //veri
myCat.setName("arthur");
myCat.getName(); //arthur
```

**case3**

```jsx
const Cat = (function (arg) {
  let name = arg ? arg : "veri";

  const Func = function () {};

  Func.prototype = {
    getName: function () {
      return name;
    },
    setName: function (arg) {
      name = arg;
    },
  };

  return Func; // 클로저
})();

const myCat = new Cat("");
myCat.name; //undefined
myCat.getName(); //veri
myCat.setName("arthur");
myCat.getName(); //arthur
```

**Exception**

```jsx
const createArr = function (arg) {
  let arr = [1, 2, 3];

  return {
    getArr: function (arg) {
      return arr; //얕은 복사로 반환하기 때문에 문제.
    },
  };
};

const obj = createArr();
const arr = obj.getArr();

arr.push(5); //createArr 함수의 은닉된 변수인 arr와 같은 주소를 갖게되는 문제.(얕은 복사)
console.log(obj.getArr()); // [1,2,3,5]
```
