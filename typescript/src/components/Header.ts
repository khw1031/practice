import { test } from "./test.js";

const Header = async () => {
  document.addEventListener("load", () => {
    console.log("Loaded");
  });
  test();
  await new Promise(_r => setTimeout(() => _r(), 1000));
  return "header";
};

export default Header;
