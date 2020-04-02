import { css } from "@emotion/core";

export const globalStyles = css`
  body {
    color: #222;
    background: #f4f4f4;
    margin: 0;
    font: 400 14px CoreSans, Arial, sans-serif;
  }

  a {
    color: #222;
  }

  a:hover {
    text-decoration: underline;
  }

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  input {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    margin-right: 10px;
    border: 1px solid #dddddd;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #dddddd;
    background: transparent;
    color: #808080;
    cursor: pointer;
  }

  button:hover {
    color: #222;
  }

  *:focus {
    outline: none;
  }
`;
