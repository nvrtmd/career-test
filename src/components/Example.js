import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'


function Example() {

    const [question, setQuestion] = useState("")
    const [exAnswer1, setAnswer1] = useState("")
    const [exAnswer2, setAnswer2] = useState("")
    const [exChecked, setChecked] = useState("")
    
    useEffect(() => {
        async function exQuestion(){
            const response = await axios.get(
                `https://www.career.go.kr/inspct/openapi/test/questions?apikey=ad5bf9f6a1f7c1af90eff9aed50ee117&q=6`
            );
            setQuestion(response.data.RESULT[0].question);
            setAnswer1(response.data.RESULT[0].answer01);
            setAnswer2(response.data.RESULT[0].answer02);
        }
        exQuestion();
    }, [])

    const handleCheckedChange = event => {
        setChecked(event.target.value)
    }
    const handleSubmit = () => {
        alert("submitted!");
    }

    return (
        <div>
            <h1>검사 예시</h1>
                <div>
                    <h2>직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.</h2>
                </div>

            <div>
                <h3>{question}</h3>
            </div>

            <form>
                <label>
                    <input type="radio" name="ex1" value="능력발휘" onChange={handleCheckedChange}></input>
                        {exAnswer1}
                </label>

                <label>
                    <input type="radio" name="ex1" value="자율성" onChange={handleCheckedChange}></input>
                    {exAnswer2}
                </label>
            </form>

            <div>
                <h1> {exChecked}</h1>
            </div>

            <div>
                <Link to="/">
                    <button>
                        이전
                    </button>
                </Link>
            </div>

            <div>
                <Link to="/test">
                <button type="submit" disabled={!exChecked} onClick={handleSubmit} >
                검사 시작
                </button>
                </Link>
            </div>
        </div>
    );
}


export default Example;
