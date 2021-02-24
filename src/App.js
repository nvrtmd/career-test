import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./components/StartPage";
import Example from "./components/Example";
import Test from "./components/Test";


function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/example" component={Example} exact />
        <Route path="/test" component={Test} exact />
      </Switch>
    </main>
  );
}

export default App;