import "./index.css";
import form from "./form";

let resultEl;

document.addEventListener("DOMContentLoaded", async () => {
  const formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);
  const module = await import(/* webpackChunkName: "result" */ "./result");
  const result = await module.default;
  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

if (module.hot) {
  console.log(module.hot);
  console.log("==================");
  console.log("HOT MODULE ON");
  console.log("==================");
  module.hot.accept("./result.js", async () => {
    resultEl.innerHTML = await result.render();
    document.body.appendChild(resultEl);
  });
}
