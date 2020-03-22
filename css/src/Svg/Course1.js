/**
 * @jsx jsx
 * SVG (Scalable Vector Graphics)
 * - XML 기반의 2차원 그래픽
 * - DOM의 일부로서 각 개체별로 HTML 엘리먼트가 추가됨
 * - 모양이 복잡하고 개체수가 많을 수록 성능이 떨어짐.
 *
 * 비교: Canvas
 * - 비트맵 기반 그래픽
 * - 이미지나 비디오의 픽셀 조작, 게임, 퍼포먼스가 중요한 이미지 조작 등에 쓰임
 * - 단일 태그 <canvas>로 표현
 * - 자바스크립트를 이용해서 조작 가능
 * - 저수준 API로 코딩량이 많고 까다로움. 크기가 커질수록 성능이 떨어짐
 *
 * 넣는 방법
 * - img 태그
 * - css background
 * - svg 요소들을 직접 inline으로 삽입
 * - object 태그
 *
 * 압축툴: svgomg
 *
 */
import { jsx, css } from "@emotion/core";

const Course1 = () => {
  return (
    <svg
      viewBox="0 0 500 500"
      css={css`
        width: 500px;
        height: 500px;
        background: #ddd;
        .rect01 {
          /* background-color: red; */
          fill: yellow;
        }
        @media (prefers-color-scheme: dark) {
          background: red;
        }
      `}
    >
      <rect x="0" y="0" width="100" height="100"></rect>
    </svg>
  );
};

export default Course1;
