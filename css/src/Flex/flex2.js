/** @jsx jsx */
import { jsx, css } from "@emotion/core";
/**
 * absolute, relative flex item
 *
 * spacing, how they are computed
 *
 * spacing within a relative flex item is computed based on it's content size.
 * absolute flex item, it is based soley on "flex" not content.
 *
 * flex-basis: 0; -> grow to fit the available space.
 * When there are two or more flex-items with zero based flex-basis values, they share the spacing available based on the flex-grow values.
 * widths aren’t computed based on content size. The widths are based on the flex value specified.
 *
 */
const Flex2 = () => (
  <ul
    css={css`
      padding: 0;
      display: flex;
      background: #ddd;
      /* flex-flow: row wrap; */
    `}
  >
    <li css={[styles.li]}>
      This is just some random text to buttress the point been explained. Some
      more random text to buttress the point being explained
    </li>
    <li css={[styles.li]}>This is just a shorter random text.</li>
  </ul>
);

const styles = {
  li: css`
    border: 1px solid red;
    list-style: none;
    margin: 0;
    padding: 4px;
    /* flex: auto; */
    flex: 1; /* flex: 1 1 0; absolute flex-item */
    margin: 2em;
  `,
};

export default Flex2;
