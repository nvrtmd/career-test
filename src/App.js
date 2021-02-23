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

  // handleNameSubmit = event => {
  //   alert('A name was submitted: ' + this.state.name);
  //   event.preventDefault();
  // }

  handleGenderChange = event => {
    this.setState({
      gender: event.target.value
    });
  };

  // handleGenderSubmit = event => {
  //   alert('A gender was submitted: ' + this.state.gender);
  //   event.preventDefault();
  // }

  render() {
    return (
      <div>

        <div>
          <h1>직업 가치관 검사</h1>
          {/* onSubmit={this.handleNameSubmit} */}
            <form> 
              <label>
                Name:
                  <input type="text" value={this.state.value} onChange={this.handleNameChange} />
              </label>
              {/* <input type="submit" value="Submit" /> */}
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
            woman
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
            man
          </label>
        </div>

        {/* <div className="form-group">
          <button className="btn btn-primary mt-2" type="submit" onClick={this.handleGenderSubmit}>
            Gender_Submit
          </button>
        </div> */}

        <div>
          <h1> 성별: {this.state.gender}</h1>
          <h3> 이름: {this.state.name}</h3>
        </div>

      </div>
    );    
  }
}
export default App;
