import React, {useState} from "react";


function StartPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

const handleNameChange = event => {
    setName(event.target.value);
  }


const handleGenderChange = event => {
    setGender(event.target.value);
  };

const handleSubmit = () => {
    alert("submitted!");
  }



  return (
    <div>

    <div>
      <h1>직업 가치관 검사</h1>
        <form> 
          <label>
            Name:
              <input type="text" name="name" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="gender"
              value="100324"
              onChange={handleGenderChange}
              className="form-check-input"
            />
            여성
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="100323"
              onChange={handleGenderChange}
              className="form-check-input"
            />
            남성
          </label>

        </form>
    </div>
    <div>
          <h1> 성별: {gender}</h1>
          <h3> 이름: {name}</h3>
        </div>

        <div>
          <button type="submit" disabled={!gender || !name} onClick={handleSubmit} >
            검사 시작
          </button>
        </div>

      </div>
  );
}

export default StartPage;
