# call by -

함수 호출 방법은 크게 두 가지가 있다.

Call by value(값에 의한 호출), Call by reference(참조에 의한 호출)

컵에 물을 채워서 이 물을 직접 가져다가 다른 컵에서 사용하느냐, 아니면 똑같은 컵과 물을 한 컵 더 준비하여 사용을 하느냐라는 식이다.

언뜻 보면 이해가 쉬울 수 있지만, 오히려 헷갈릴 수가 있다. 이는 프로그래밍적으로 직접 접근해서 알아보는 것이 가장 확실하다.

Call by Reference : 데이터의 시작주소를 전달하여 데이터를 연산하도록 지시함

Call by Value : 데이터의 값을 전달하여 데이터를 연산하도록 지시함

<br><br>

## parameter vs arguments

우선 call by value에 들어가기에 앞서서 parameter(매개변수)와 arguments(인자)에 대해 짚고 넘어가자.

```jsx
var a = 1;
var func = function (b) {
  // parameter, formal parameter, 매개변수, 형식 매개변수
};

func(a); // arguments, actual parameter, 인자, 실인자
```

형식 매개변수는 b가 되고 실인자는 1이 된다.

<br><br>

## Call by value(값에 의한 호출)

장점 : 복사하여 처리하기 때문에 안전하다. 원래의 값이 보존이 된다.

단점 : 복사를 하기 때문에 메모리가 사용량이 늘어난다.

arguments로 넘어온 값은 복사된 값으로, 해당 인자를 변형시켜도 원본은 영향받지 않는다.

```jsx
var a = 1;
var func = function (b) {
  // callee
  b = b + 1;
};
func(a); // caller

console.log(a); // 1
```

기본적으로 자바스크립트는 원시값을 arguments로 넘겨주면 call by value의 형태로 작동한다.

<br>

## Call by reference(참조에 의한 호출)

장점 : 복사하지 않고 직접 참조를 하기에 빠르다.

단점 : 직접 참조를 하기에 원래 값이 영향을 받는다.(리스크)

arguments로 reference(값에 대한 참조 주소, 메모리 주소를 담고있는 변수)를 넘겨준다. reference가 가리키는 값을 복사하지는 않아서 해당 인자를 변형시키면 원본에 영향을 받는다.

```jsx
var a = {};
var func = function (b) {
  // callee
  b.a = 1;
};
func(a); // caller

console.log(a.a); // 1
```

기본적으로 자바스크립트는 참조타입을 arguments로 넘기면 call by reference의 형태로 작동한다. 원본이 영향을 받기 때문에 조심해서 사용해야한다. 라고 오해하고있다. 라고한다.;

<br><br>

## call by sharing

```jsx
var a = {};
var func = function (b) {
  // callee
  b = 1;
};
func(a); // caller
console.log(a); // {}
```

참조 타입을 넘겼는데 값이 변하지 않았다.

JS에서는 무조건 call by value로 작동하기 때문이다.

<img src="./image/reference.png" />

변수 a에 담기는 것은 객체 {}가 담겨있는 메모리 주소 0x12이다. (원시값이 아닌 참조 타입이기 때문에)

<img src="./image/reference2.png" />

a에 대한 참조값을 복사한 value(b)가 새로 생성된다.
아직까지는 이 참조된 값이 {} 객체를 가리키고 있다.

<img src="./image/reference3.png" />

= 연산자로 참조값을 재할당하기 때문에 기존에 참조하던 {}에서 1로 참조 대상이 변경되었다.

결론 : 함수에 문자열, 숫자 등의 기본 형태의 인자를 넘기면 값을 복사한 지역 변수로 사용한다.
함수에 객체 형태의 인자를 넘기면 속성은 공유하지만 새로 객체를 할당할 수는 없다.

http://milooy.github.io/TIL/JavaScript/call-by-sharing.html#%E1%84%80%E1%85%A7%E1%86%AF%E1%84%85%E1%85%A9%E1%86%AB

https://perfectacle.github.io/2017/10/30/js-014-call-by-value-vs-call-by-reference/
