import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Flex from "./Flex";
import Navigation from "./components/Navigation";
import Svg from "./Svg";

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route path="/flex">
        <Flex />
      </Route>
      <Route path="/svg">
        <Svg />
      </Route>
    </Switch>
  </Router>
);

export default App;
