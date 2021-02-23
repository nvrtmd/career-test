import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./StartPage";


function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={StartPage} exact />
      </Switch>
    </main>
  );
}

export default App;