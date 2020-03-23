/** @jsx jsx */
import { jsx, css } from "@emotion/core";

/**
 * flex-flow: [flex-direction], [flex-wrap];
 *
 * flex-grow, flex-shrink
 * - control how much a flex-item should "grow" when there are extra spaces(grow), if there are no extra spaces(shrink)
 * 0 || positive number
 *
 * flex-grow: 0 [default] - like turn off switch
 * flex-shrink: 1 [default] - always on
 * flex-basis: auto [default]
 *
 * flex: 0 1 auto;
 * flex: [flex-grow] [flex-shrink] [flex-basis];
 *
 * align-self: auto || flex-start || flex-end || center || base-line || stretch
 */
const Flex1 = () => (
  <ul
    css={css`
      padding: 0;
      display: flex;
      /* flex-flow: row wrap; */
    `}
  >
    <li
      css={[
        styles.li,
        css`
          flex: 2 1 0;
          align-self: baseline;
        `,
      ]}
    >
      Lorem ipsum Lorem ipsum Lorem ipsum
    </li>
    <li
      css={[
        styles.li,
        css`
          flex: 1 1 0;
          background: blue;
        `,
      ]}
    >
      Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
      111
    </li>
  </ul>
);

const styles = {
  li: css`
    list-style: none;
    margin: 0;
    padding: 4px;
    background-color: red;
    /* flex: 0 1 auto; */
    /* flex: 0 0 auto; flex: none; */
    /* flex: 1 1 auto; flex: auto; */
    /* flex: 2 1 0; flex: 2; */
  `,
};

export default Flex1;
