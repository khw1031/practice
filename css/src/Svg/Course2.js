/**
 * @jsx jsx
 *
 *
 */
import { jsx, css } from "@emotion/core";

const Course2 = () => {
  return (
    <svg
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
      <rect x="10" y="20" width="200" height="100"></rect>
      <rect x="50" y="180" rx="10" ry="10" width="100" height="100"></rect>
      <circle cx="300" cy="200" r="50"></circle>
      <ellipse
        cx="200"
        cy="330"
        rx="100"
        ry="50"
        fill="red"
        stroke="green"
        strokeWidth="20"
      ></ellipse>
      <line x1="10" x2="400" y1="30" y2="300" stroke="blue"></line>
      <polyline points="0 0, 200 100, 150 300" stroke="blue"></polyline>
      <polygon
        points="50 50, 200 100, 150 300"
        stroke="red"
        strokeWidth="10"
      ></polygon>
    </svg>
  );
};

export default Course2;
