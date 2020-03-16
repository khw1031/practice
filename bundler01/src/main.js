import printMe from "./print";
import "./index.css";

printMe();

document.querySelector("#app").innerHTML = `
  <div>Hello World!</div>
`;
