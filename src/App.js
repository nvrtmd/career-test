import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./components/StartPage";
import Example from "./components/Example";


function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/example" component={Example} exact />
      </Switch>
    </main>
  );
}

export default App;