import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Courses from "./Courses";
import Rxjs from "./Rxjs";
import Js from "./Js";

const App = () => (
  <Router>
    <ul>
      <li>
        <Link to="/ds">ds</Link>
      </li>
      <li>
        <Link to="/rxjs">rxjs</Link>
      </li>
      <li>
        <Link to="/js">js</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/ds">
        <Courses />
      </Route>
      <Route path="/rxjs">
        <Rxjs />
      </Route>
      <Route path="/js">
        <Js />
      </Route>
    </Switch>
  </Router>
);

export default App;
