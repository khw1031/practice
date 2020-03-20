import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/flex">flexbox</Link>
      </li>
      <li>
        <Link to="/svg">svg</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
