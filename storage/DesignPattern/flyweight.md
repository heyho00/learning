# Flyweight

## 동일한 개체로 작업할 때 기존 인스턴스 재사용

플라이급 패턴은 유사한 객체를 많이 만들 때 메모리를 절약하는 유용한 방법.

```js
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const isbnNumbers = new Set();
const bookList = [];

const addBook = (title, author, isbn, availibility, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availibility,
    isbn,
  };

  bookList.push(book);
  return book;
};

const createBook = (title, author, isbn) => {
  const book = isbnNumbers.has(isbn);
  if (book) {
    return book;
  } else {
    const book = new Book(title, author, isbn);
    isbnNumbers.add(isbn);
    return book;
  }
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length); // 5
console.log("Total amount of books: ", isbnNumbers.size); // 3
```

많은 수의 객체를 만들때 소비 메모리의 양을 최소화 할 수 있다.

- 자바스크립트에서는 프로토타입 상속을 통해 이 문제를 쉽게 해결할 수 있다.
- RAM의 성능이 좋아지며 flyweight 패턴의 중요성이 덜해졌다.
