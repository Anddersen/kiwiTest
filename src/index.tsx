import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

import Main from "./pages/main/Main";
import Flights from "./pages/flights/Flights";

import "antd/dist/antd.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/flights/:from/:to/:depart/:back">
          <Flights />
        </Route>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
