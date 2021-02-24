import axios from "axios";
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'

function Test() {
    const [contents, setContents] = useState("");

    useEffect(() => {
        async function contents(){
            const response = await axios.get(
                `http://www.career.go.kr/inspct/openapi/test/questions?apikey=ad5bf9f6a1f7c1af90eff9aed50ee117&q=6`
            );
            // console.log(response.data.RESULT)
            setContents(response.data.RESULT);
        }
        contents();
    }, [])

    const array = contents;
    const questionArr = [];
    const answ01Arr = [];
    const answ02Arr = [];

    for(var i = 0; i< array.length; i++){
        questionArr.push(array[i].question)
        answ01Arr.push(array[i].answer01)
        answ02Arr.push(array[i].answer02)
    }
    return(
        <div>
            <h1>TEST</h1>
            <div>
                <form>
                    <div>
                    {questionArr[0]}
                    </div>

                    <label>
                        <input type="radio" name="q1" value={answ01Arr[0]}></input>
                        {answ01Arr[0]}
                    </label>
                    <label>
                        <input type="radio" name="q1" value={answ02Arr[0]}></input>
                        {answ02Arr[0]}
                    </label>
                </form>
            </div>

            <div>
                <form>
                    <div>
                    {questionArr[1]}
                    </div>

                    <label>
                        <input type="radio" name="q1" value={answ01Arr[1]}></input>
                        {answ01Arr[1]}
                    </label>
                    <label>
                        <input type="radio" name="q1" value={answ02Arr[1]}></input>
                        {answ02Arr[1]}
                    </label>
                </form>
            </div>

        </div>
    );
}


export default Test;
