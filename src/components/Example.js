import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Example.css";

function Example() {
  const [question, setQuestion] = useState("");
  const [exAnswer1, setAnswer1] = useState("");
  const [exAnswer2, setAnswer2] = useState("");
  const [exChecked, setChecked] = useState("");
  const apiUrl = `https://www.career.go.kr/inspct/openapi/test/questions?apikey=ad5bf9f6a1f7c1af90eff9aed50ee117&q=6`;
  useEffect(() => {
    async function exQuestion() {
      const response = await axios.get(apiUrl);
      setQuestion(response.data.RESULT[0].question);
      setAnswer1(response.data.RESULT[0].answer01);
      setAnswer2(response.data.RESULT[0].answer02);
    }
    exQuestion();
  }, []);

  const handleCheckedChange = (event) => {
    console.log(event.target.value);
    setChecked(event.target.value);
  };
  const handleSubmit = () => {
    console.log("submitted!");
  };

  return (
    <div className="whole_div">
      <h2>검사 예시</h2>
      <div className="ex_question_box">
        <h5
        style={{marginTop: '8px'}}>
          직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.
        </h5>
        <form>
          <label className="sample_no1">
            <input
              className="form-check-input"
              type="radio"
              name="ex1"
              value="능력발휘"
              onChange={handleCheckedChange}
            ></input>
            {exAnswer1}
          </label>

          <label className="sample_no2">
            <input
              className="form-check-input"
              type="radio"
              name="ex1"
              value="자율성"
              onChange={handleCheckedChange}
            ></input>
            {exAnswer2}
          </label>
        </form>
      </div>
      <div>
      <br />

        <Link to="/">
          <button
            className="btn btn-info"
            style={{ display: "inline-block", marginRight: 10 }}
          >
            이전
          </button>
        </Link>
        <Link to="/test">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!exChecked}
            onClick={handleSubmit}
          >
            검사 시작
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Example;
