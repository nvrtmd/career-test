import axios from "axios";
import {useParams} from "react-router-dom";

const Result = () => {
    const params = useParams();
    const seq = params.seq;

    axios.get("https://inspct.career.go.kr/inspct/api/psycho/report?seq=" + seq)
    return (
        <div>
            <h1>직업가치관검사 결과표</h1>
            <h3>{seq}</h3>
        </div>
    )
}

export default Result;