
// 이진검색 (이분검색)

// 이진 탐색이란 데이터가 정렬돼 있는 배열에서 특정한 값을 찾아내는 알고리즘이다.

// 배열의 중간에 있는 임의의 값을 선택하여 찾고자 하는 값 X와 비교한다. 

// X가 중간 값보다 작으면 중간 값을 기준으로 좌측의 데이터들을 대상으로, 

// X가 중간값보다 크면 배열의 우측을 대상으로 다시 탐색한다. 

// 동일한 방법으로 다시 중간의 값을 임의로 선택하고 비교한다. 

// 해당 값을 찾을 때까지 이 과정을 반복한다.

// 이진탐색(O(logN))은 단순한 배열 순회(O(N))보다 시간복잡도에서 크게 이점을 갖는다.

function binarySearch (arr, target) {
    let start = 0;
    let end = arr.length-1
    let mid

    while(start<=end){
        mid = ~~((start+end)/2)

        if(target === arr[mid]){
            return mid
        } else {
            if(target<arr[mid]){
                end = mid-1
            } else {
                start = mid+1
            }
        }
    }
    return -1
}

let output = binarySearch([0, 0.5,1,2,3,4,5,6], 2)

describe('binary search',() => {
    test('이분검색 성공', () => {
        expect(binarySearch([0,1,2,3,4,5,6], 2)).toBe(2)
        expect(binarySearch([0, 0.5,1,2,3,4,5,6], 2)).toBe(3)
        expect(binarySearch([], 2)).toBe(-1)
        expect(binarySearch([3,5,2,1,3,6,7,7], 2)).not.toBe(2)
    })
})