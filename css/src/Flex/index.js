import React from "react";
import styled from "@emotion/styled";

const Flex = () => (
  <Styled.div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </Styled.div>
);

export default Flex;

const Styled = {
  div: styled.div`
    /* flex-direction: row || column || row-reverse || column-reverse */
    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      display: flex;
      /* flex-wrap: wrap || no-wrap || wrap-reverse;  */
      /* flex-wrap: wrap; */

      flex-flow: row wrap;
      /* flex-wrap: [flex-direction, flex-wrap] */
      /* justify-content: flex-start || flex-end || center || space-between || space-around; */
      justify-content: space-around;
    }

    li {
      width: 100px;
      height: 100px;
      background-color: palegreen;
      margin: 8px;
    }
  `,
};
