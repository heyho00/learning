
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