/**
 * @jsx jsx
 *
 *
 */
import { jsx, css } from "@emotion/core";

const Course4 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      css={css`
        width: 100%;
        height: 400px;
        background: #ddd;
        text {
          font-size: 1.5rem;
          font-weight: 800;
        }
      `}
    >
      <path
        d="M 300 200 L 500 100 L 400 200"
        stroke="tomato"
        strokeWidth="20"
        strokeLinecap="round"
        // strokeLinecap="butt"
        // strokeLinecap="square"
        // strokeLinejoin="miter"
        // strokeLinejoin="round"
        strokeLinejoin="bevel"
        fill="transparent"
      ></path>
      {/* SVG Grouping */}
      <g fill="red">
        <rect x="10" y="20" width="200" height="100"></rect>
        <rect x="20" y="40" width="200" height="100"></rect>
      </g>
      <text x="120" y="200">
        <textPath href="#text-curve">
          <tspan fill="blue">Lorem</tspan> ipsum dolor sit amet consectetur,
          adipisicing elit. Nemo nobis deserunt quas odio ipsum voluptates
          dolores blanditiis doloribus, vel, consectetur molestias voluptas
          corrupti corporis numquam quis id! Eius, quisquam reiciendis!
        </textPath>
      </text>
      <defs>
        <path
          id="text-curve"
          d="M 0 10 C 50 400, 300 500, 400 400 C 400 400, 600 170, 700 300"
          stroke="blue"
          fill="transparent"
        ></path>
      </defs>
    </svg>
  );
};

export default Course4;
