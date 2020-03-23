/**
 * @jsx jsx
 *
 *
 */
import { jsx, css } from "@emotion/core";

const Course3 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        width: 600px;
        height: 400px;
        background: #ddd;
        rect {
          fill: orange;
          stroke: dodgerblue;
          stroke-width: 10;
        }
      `}
    >
      <path
        d="M 300 200 L 500 100 H 50 V 300 Z"
        stroke="tomato"
        strokeWidth="5"
        fill="transparent"
      ></path>
      <path
        d="M 100 150 C 100 15, 300 100, 500 250"
        stroke="green"
        strokeWidth="5"
        fill="transparent"
      ></path>
    </svg>
  );
};

export default Course3;
