import axios from "axios";
import React, {useState, useEffect, useCallback, useMemo, useRef} from "react";
import { Link } from 'react-router-dom'

const Test = () => {
    const apiUrl = `http://www.career.go.kr/inspct/openapi/test/questions?apikey=ad5bf9f6a1f7c1af90eff9aed50ee117&q=6`;
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(0);
    const [answChecked, setAnswChecked] = useState(0);

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

    // var answer = 0;
    const handleCheckedChange = (e) => {
        // answer += 1;
        // console.log(answer)
        // setAnswChecked(answer);
        console.log(e.target.value)
    };

    const handlePageChange = () => {
        setPage((current) => {
            return current + 1
        });
        setAnswChecked(0)
    }

    return (<div>
        {/* {JSON.stringify(questions)} */}
        {/* {visibleQuestions.map((qitemNo)=>{
            return <div key={qitemNo.qitemNo}>{qitemNo.qitemNo}</div>
        })} */}
        <div>
            {visibleQuestions.map((question)=>{
                return (
                    <div>
                        <div key={question.qitemNo}>{question.question}</div>
                        <form>
                        <label>
                                <input type="radio" name="select" value={question.answerScore01} onChange={handleCheckedChange}></input>
                                {question.answer01}
                            </label>

                            <label>
                                <input type="radio" name="select" value={question.answerScore02} onChange={handleCheckedChange}></input>
                                {question.answer02}
                            </label>
                        </form>

                    </div>
                    
                    ) 
            })}
            
        </div>
        <button
            disabled={answChecked < 3} 
            onClick={handlePageChange}
        >다음 페이지</button>

    </div>
    );
}
export default Test;