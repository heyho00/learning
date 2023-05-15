
// 재귀 함수

// 자연수 n이 입력되면 n까지의 숫자를 배열에 넣어

function solution(n){
    let arr = []

    function DFS(L){
        if(L==0) return;
        else{
            arr=[L,...arr] 
            DFS(L-1);
            //이것과 같은 결과.
            // DFS(L-1);
            // arr=[...arr, L]  
        }
    }
    DFS(n);

    return arr
}

describe('재귀함수1번', ()=>{
    test('성공',()=>{
        expect(JSON.stringify(solution(3))).toBe(JSON.stringify([1,2,3]))
    })
})

// 첫 DFS(3)의 정보가 스택에 쌓인다.
// 대기상태로 다음 DFS(2)도 실행된다.
// 스택 구조를 사용하는 것. 최근에 들어간 스택부터 작동한다.
// 복귀 주소라는 개념이 중요하네.








// 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하세요. 단 재귀함수를 이용
// 해서 출력해야 합니다.

function binaryNum (n) {
    let answer =''

    function DFS(L){
        if(L===0) return
        else {
            DFS(~~(L/2))
            answer+= String(L%2)
        }
    }
    DFS(n)
    return Number(answer)
}

describe('이진수 출력', ()=>{
    test('성공',()=>{
        expect(binaryNum(11)).toBe(1011)
    })
})












// 이진트리 순회(깊이우선탐색)

// 전위순회와 후위순회를 연습해보자.

//       1
//   2       3
// 4  5    6    7

// 전위순회 출력 : 1 2 4 5 3 6 7
// 중위순회 출력 : 4 2 5 1 6 3 7
// 후위순회 출력 : 4 5 2 6 7 3 1

// 우선 1을 부모로보고 2, 3이 자식이라면
// 왼쪽자식은 부모 * 2 오른쪽 자식은 부모 * 2 + 1 의 개념. -> 전위순회

// 왼 부 오 -> 중위 순회
// 왼 오 부 -> 후위 순회

function binaryTree (v) {
    let answer = []

    function DFS(v) {
        if(v>7){
            return
        } else {
            answer = [...answer, v] //전위순회
            DFS(v*2)
            DFS(v*2+1)
        }
    }
    DFS(v)
    return answer
}

describe('이진트리 순회', () => {
    test('전위 순회', () => {
        expect(binaryTree(1)).toStrictEqual([1,2,4,5,3,6,7])
        // toBe는 객체의 메모리 주소를 확인한다함. 값이 같아도 다르다고 나옴.
        // toEqual, toStrictEqual은 값을 비교.
    })
})


function binaryTree2 (v) {
    let answer = []

    function DFS(v) {
        if(v>7){
            return
        } else {
            DFS(v*2)
            answer = [...answer, v] //중위순회
            DFS(v*2+1)
        }
    }
    DFS(v)
    return answer
}


describe('이진트리 순회', () => {
    test('중위 순회', () => {
        expect(binaryTree2(1)).toStrictEqual([4,2,5,1,6,3,7])
        // toBe는 객체의 메모리 주소를 확인한다함. 값이 같아도 다르다고 나옴.
        // toEqual, toStrictEqual은 값을 비교.
    })
})


function binaryTree3 (v) {
    let answer = []

    function DFS(v) {
        if(v>7){
            return
        } else {
            DFS(v*2)
            DFS(v*2+1)
            answer = [...answer, v] // 후위순회
        }
    }
    DFS(v)
    return answer
}


describe('이진트리 순회', () => {
    test('후위 순회', () => {
        expect(binaryTree3(1)).toStrictEqual([4,5,2,6,7,3,1])
        // toBe는 객체의 메모리 주소를 확인한다함. 값이 같아도 다르다고 나옴.
        // toEqual, toStrictEqual은 값을 비교.
    })
})







//부분집합 구하기 

// 자연수 N이 주어지면 1부터 N까지의 원소를 갖는 집합의 부분집합을 모두 출력하는 프로그램
// 을 작성하세요.

// ▣ 입력예제 1
// 3
// ▣ 출력예제 1
// 1 2 3
// 1 2
// 1 3
// 1
// 2 3
// 2
// 3

function 부분집합 (num) {
    
    function DFS(n){
        if(v===n+1){

        } else {

        }
    }
    DFS(num)

    return [[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3]]
}


describe('부분집합',()=>{
    test('구하기',()=>{
        expect(부분집합(3)).toEqual([[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3]])
        expect([[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3]]).toEqual([[1,2,3],[1,2],[1,3],[1],[2,3],[2],[3]])
    })
})