/** @jsx jsx */
import { jsx, css } from "@emotion/core";
/**
 * Beware of `margin: auto;` alignment on flex items;
 * https://hyunseob.github.io/solved-by-flexbox-kr/
 *
 */
const Flex3 = () => (
  <ul
    css={css`
      padding: 0;
      display: flex;
      background: #ddd;
      /* flex-flow: row wrap; */
    `}
  >
    <li
      css={[
        styles.li,
        css`
          margin: 8px auto;
        `,
      ]}
    >
      Branding
    </li>
    <li css={[styles.li]}>Home</li>
    <li css={[styles.li]}>Services</li>
    <li css={[styles.li]}>About</li>
    <li css={[styles.li]}>Contact</li>
  </ul>
);

const styles = {
  li: css`
    border: 1px solid red;
    list-style: none;
    margin: 0;
    /* flex: auto; */
    flex: 0 0 auto; /* flex: 1 1 0; absolute flex-item */
    justify-content: flex-end;
    padding: 4px;
    margin: 8px;
  `,
};

export default Flex3;
