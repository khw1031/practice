import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Courses from "./Courses";
import Rxjs from "./Rxjs";

const App = () => (
  <Router>
    <ul>
      <li>
        <Link to="/ds">ds</Link>
      </li>
      <li>
        <Link to="/rxjs">rxjs</Link>
      </li>
    </ul>
    <Switch>
      <Route path="/ds">
        <Courses />
      </Route>
      <Route path="/rxjs">
        <Rxjs />
      </Route>
    </Switch>
  </Router>
);

export default App;
