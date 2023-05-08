
// 재귀 함수

// 자연수 N이 입력되면 재귀함수를 이용하여 1부터 N까지를 출력하는 프로그램을 작성하세요.

function solution(n){
    let arr = []

    function DFS(L){
        if(L==0) return;
        else{
            DFS(L-1);
            arr=[...arr, L] 
        }
    }
    DFS(n);

    return arr
}

describe('재귀함수', ()=>{
    test('잘 될때',()=>{
        expect(JSON.stringify(solution(3))).toBe(JSON.stringify([1,2,3]))
    })
})