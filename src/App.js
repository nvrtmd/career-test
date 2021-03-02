import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./components/StartPage";
import Example from "./components/Example";
import Test from "./components/Test";
import Completed from "./components/Completed";
import Result from "./components/Result";
import userInfo from './context/Context';

function App() {

  return (
    <main>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/example" component={Example} exact />
        <Route path="/test" component={Test} exact />
        <Route path="/completed" component={Completed} exact />
        <Route path="/result/:seq" component={Result} exact />
      </Switch>
    </main>
  );
}

export default App;