# 객체와 다형성

### 객체를 사용하는 이유

1. 기능을 수행하기 위해 필요한 내용을 일관성있게 사용할 수 있도록 제공한다.
2. 지속적 관리가 필요한 데이터를 쉽게 관리할 수 있도록 한다.
3. 반복적인 기능을 수행하려고할때 규격을 결정하는데 사용한다.

```jsx
const name = 'harry';
const tel = '01092929292';
const email = 'harry@dev.com';

class User {
	constructor(_name, _tel, _email){ // 생성자(init, initialize, create) <-> 소멸자 (destroy))
		this.name = _name;
		this.tel = _tel;
		this.email = _email;
	}
}

interface User {
	name:string;
	tel:string;
	email:string;
}
```
<br><br>

### 객체를 다루는 유형

**일반객체**
데이터와 기능을 모아놓은 객체

```jsx
class Myhome {
  cat: string;
 
  constructor(catName: string) {
    this.cat = catName;
  }
 
  greet() {
    return "hello, " + this.cat;
  }
}
 
let hicat = new Myhome("veri");

hicat.cat //veri
hicat.greet() //hello, veri

```

<br>

**인터페이스 객체**
데이터 유형만 선언되어 있고, 실제 인스턴스 객체로 존재하지 않는 객체.

```jsx
interface IProps {
  label: string;
	size: number;
}
 
function printLabel(labeledObj: IProps) {
	console.log((labeledObj as any).size); // 무결성을 깨는것.
  console.log(labeledObj.label);
}
 
let myObj = { size: 10, label: "Size 10 Object" }; 
printLabel(myObj);
```

<br><br>

## 다형성이란? 
재사용성을 극대화 시켜 데이터 객체를 정의하고, 각 기능의 자유도는 하부 객체에게 위임하는 형태.
객체지향의 핵심이다.

```jsx
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
	
  public makeSound(): void {
    process.stdout.write('generic animal sound\n');
  }
}

class Dog extends Animal {
  public makeSound(): void {
    process.stdout.write('wuff wuff\n');
  }
}

class Cat extends Animal {
  public makeSound(): void {
    process.stdout.write('meow meow\n');
  }
}

const pocky: Cat = new Cat('Pocky');
pocky.makeSound(); // -> meow meow
pocky.name //'Pocky'

const toshii: Dog = new Dog('Pocky');
toshii.makeSound(); // -> wuff wuff
```


<br><br>

## 다형성을 사용하기 위해 이해하고 넘어가야 할 개념


**상속과 싱글턴패턴**

1. 상속
- 상속은 기본적으로 정의된 객체를 하위 객체가 그 기능을 위임받아 재정의 하는 형태.

2. 싱글턴 패턴 -> GoF(Gang of Four) Patterns

- 관리 가능한 객체를 만들기 위해 가장 일반적으로 사용하는 디자인 패턴
- 관리 기법에 따라 다양한 정의방식이 있지만, 자바스크립트나 타입스크립트에서는 전역 선언을 사용한다.


<br><br>

## 객체와 인스턴스

객체 : 인스턴스를 생성하기 위해 정의된 데이터 모델

인스턴스 : 객체가 메모리에 할당되어 사용가능한 상태로 존재하는 형태

<br><br>

## 다형성
다형성을 사용하기 위해서는 기본적으로 상속을 이용한다.

상속된 객체들은 서로 다른 기능을 추가하거나 기존에 정의되어 있는 기능을 재정의 할 수 있다.

객체별로 유지해야할 특성은 그대로 유지할 수 있으며, 상황에 따라 부모 객체로 묶어 관리할 수 있다.

