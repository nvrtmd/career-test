import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./components/StartPage";
import Example from "./components/Example";
import Test from "./components/Test";
import Completed from "./components/Completed";
import Result from "./components/Result";
import {createContext, useState} from "react"
import './App.css';

//useContext 사용하여 사용자 이름, 성별 입력받아 사용
const NameContext = createContext({});
const GenderContext = createContext({});

function App() {
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")

  return (
    <main>
      <NameContext.Provider value={{name, setName}}>
        <GenderContext.Provider value={{gender, setGender}}>
        <Switch>
          <Route path="/" component={StartPage} exact />
          <Route path="/example" component={Example} exact />
          <Route path="/test" component={Test} exact />
          <Route path="/completed/:seq" component={Completed} exact />
          <Route path="/result/:seq" component={Result} exact />
        </Switch>
        </GenderContext.Provider>
      </NameContext.Provider>
    </main>
  );
}
export {NameContext , GenderContext}

export default App;