import React from "react";

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      name: "",
    };
  }

  handleNameChange = event => {
    this.setState({name: event.target.value});
  }


  handleGenderChange = event => {
    this.setState({
      gender: event.target.value
    });
  };

  handleSubmit = () => {
    alert("submitted!");
  }



  render() {
    return (
      <div>

        <div>
          <h1>직업 가치관 검사</h1>
            <form> 
              <label>
                Name:
                  <input type="text" value={this.state.value} onChange={this.handleNameChange} />
              </label>
            </form>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="woman"
              checked={this.state.gender === "woman"}
              onChange={this.handleGenderChange}
              className="form-check-input"
            />
            여성
          </label>
        </div>

        <div className="form-check">
          <label>
            <input
              type="radio"
              name="react-tips"
              value="man"
              checked={this.state.gender === "man"}
              onChange={this.handleGenderChange}
              className="form-check-input"
            />
            남성
          </label>
        </div>

        <div>
          <h1> 성별: {this.state.gender}</h1>
          <h3> 이름: {this.state.name}</h3>
        </div>

        <div>
          <button type="submit" disabled={this.state.gender.length < 1 || this.state.name.length < 1} onClick={this.handleSubmit} >
            검사 시작
          </button>
        </div>

      </div>
    );    
  }
}
export default App;
