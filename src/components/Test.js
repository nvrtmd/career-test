import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom'




const Test = () => {
    const apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=ad5bf9f6a1f7c1af90eff9aed50ee117&q=6`;
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [answChecked, setAnswChecked] = useState([]);
    const [countAnswChecked, setCountAnswChecked] = useState([]);
    const [ynchecked, setYnchecked] = useState();
    const fetchQuestions = useCallback(async () => {
        const response = await axios.get(apiUrl);
        setQuestions(response.data.RESULT);
    }, [apiUrl])

    const visibleQuestions = useMemo(() => {
        return questions.slice(page * 5, (page + 1) * 5); 
    }, [page, questions])

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    

    //const handleAnswChecked = () => {
        // setAnswChecked(e.target.name)
        // console.log(answChecked)
        // a();
        //1. 라디오 버튼 클릭할 때마다 question.qitemNo를 answChecked의 값으로 할당->question.answer01를 클릭하든 question.answer02를 클릭하든 qitemNo는 같으니 중복 할당되지 않음
    //}


    //const k = () => { //3. k에서는 countAnswChecked의 상태를 1씩 더하는 식으로 변화시킴
        // countAnswChecked.push(answChecked)
    //}

    //const a = useMemo(()=> {return k}, [answChecked]) //2. useMemo를 사용해 answChecked 값 변할 때마다 k 함수 실행하게 함
 //4. 근데 countAnswChecked를 찍어봤더니 계속 같은 값(0)만 찍힘...왜지?ㅠㅠ


    const handlePageChange = () => {
        setPage((current) => {
            return current + 1
        });

    }

    return (<div>
        {/* {JSON.stringify(questions)} */}
        {/* {visibleQuestions.map((qitemNo)=>{
            return <div key={qitemNo.qitemNo}>{qitemNo.qitemNo}</div>
        })} */}
        <div>
            {visibleQuestions.map((question)=>{
                const qitemNo = parseInt(question.qitemNo, 10);
                return (
                    <div>
                        <div key={question.qitemNo}>{question.question}</div>
                        <form>
                        <label>
                                <input type="radio" name={qitemNo} checked={ynchecked} value={question.answerScore01} onChange={()=> {
                                            setAnswChecked((current) => {
                                                const newAnswChecked = [...current]
                                                newAnswChecked[qitemNo - 1] = parseInt(question.answerScore01, 10)
                                                setCountAnswChecked(newAnswChecked)
                                                console.log(newAnswChecked)
                                                return newAnswChecked
                                            })                                    
                                }}></input>
                                {question.answer01}
                            </label>

                            <label>
                                <input type="radio" name={qitemNo} checked={ynchecked} value={question.answerScore02} onChange={()=> {
                                            setAnswChecked((current) => {
                                                const newAnswChecked = [...current]
                                                newAnswChecked[qitemNo - 1] = parseInt(question.answerScore02, 10)
                                                setCountAnswChecked(newAnswChecked)
                                                console.log(newAnswChecked)
                                                return newAnswChecked
                                            })                                    
                                }}></input>
                                {question.answer02}
                            </label>
                        </form>

                    </div>
                    
                    ) 
            })}
            
        </div>
        <button
            // disabled={countAnswChecked.length < 5} 
            onClick={handlePageChange}
        >다음 페이지</button>

    </div>
    );
}
export default Test;