# front clean code

[진유림 클린코드](https://www.youtube.com/watch?v=edWbHp_k_9Y)

흐름 파악이 어렵고

도메인 맥락 표현이 안되어

동료에게 물어봐야 알 수 있는 코드를 개선시켜야 한다.

```js
// 1 -------------------------------------------------------
function QuestionPage(){
    const [popupOpened, setPopupOpened] = useState(false)

    async function handleQuestionSubmit(){
        const 연결전문가 = await 연결전문가_받아오기()
        if(연결전문가 !== null){
// ---------------------------------------------------------            
            setPopupOpened(true)
        } else {
            const 약관동의 = await 약관동의_받아오기()
            if(!약관동의){
                await 약관동의_팝업열기()
            }
            await 질문전송(questionValue)
            alert('질문이 등록되었어요.')
        }
    }

// 2-------------------------------------------------------
    async function handleMyExpertQuestionSubmit(){
        await 연결전문가_질문전송(questionValue, 연결전문가.id)
        alert(`${연결전문가.name}에게 질문이 등록되었어요.`)
    }

// ---------------------------------------------------------

    return (
        <main>
            <form>
                <textarea placeholder="어떤 내용이 궁금한가요?" />
                    <button onClick={handleQuestionSubmit}>질문하기</button>
            </form>

// 3-------------------------------------------------------
            {popupOpened && (
                <연결전문가팝업 onSubmit={handleMyExpertQuestionSubmit} />
            )}
        </main>
// ---------------------------------------------------------
    )
}
```

- 하나의 목적인 코드가 3군데 흩뿌려져 있다.

- 하나의 함수가 여러 일을 한다. (handleQuestionSubmit) 기능을 추가하면서 추가됐다.

- 함수의 세부 구현 단계가 제각각이다.
