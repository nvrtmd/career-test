import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { NameContext, GenderContext } from "../App";
import "./StartPage.css";
import Comment from "./Comment";

function StartPage() {
  //   const [name, setName] = useState("");
  const { name, setName } = useContext(NameContext);
  const { gender, setGender } = useContext(GenderContext);
  //   const [gender, setGender] = useState("");
  // const user = useContext(userInfo)
  // const [errorMessage, setErrorMessage] = useState("이름과 성별을 입력하세요.");

  const handleNameChange = (event) => {
    setName(event.target.value)
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log(event.target.value);
  };

  return (
    <div className="whole_div">
      <div>
        <h1>직업 가치관 검사</h1>
        <div className="info_box">
          <form>
            <div>
              <label className="name">
                이름: &nbsp;
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="이름을 입력하세요"
                  onChange={handleNameChange}
                />
              </label>
            </div>
            <label className="gender_woman">
              <input
                type="radio"
                name="gender"
                value="100324"
                onChange={handleGenderChange}
                className="form-check-input"
                checked={gender === "100324"}
              />
              여성
            </label>

            <label className="gender_man">
              <input
                type="radio"
                name="gender"
                value="100323"
                onChange={handleGenderChange}
                className="form-check-input"
                checked={gender === "100323"}
              />
              남성
            </label>
          </form>
          {/* <div class="alert alert-success" role="alert">
            {errorMessage}
          </div> */}
          <br />
          <div>
            <Link to="/example">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!gender || !name}
                onClick={handleSubmit}
              >
                다음
              </button>
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      
      <h3>Comments</h3>
      <Comment />
    </div>
  );
}

export default StartPage;
