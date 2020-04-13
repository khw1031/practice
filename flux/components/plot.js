import React, { useEffect, memo } from "react";

function Plot({ xData: x, yData: y, type, onClick }) {
  console.log("render plot");
  useEffect(() => {
    Plotly.newPlot(
      "plot",
      [
        {
          x: x.toJS(),
          y: y.toJS(),
          type,
        },
      ],
      {
        margin: {
          t: 0,
          r: 0,
          l: 30,
        },
        xaxis: {
          gridcolor: "transparent",
        },
      },
      {
        displayModeBar: false,
      }
    );
    document.querySelector("#plot").on("plotly_click", onClick);
  }, [x, y, type]);

  return <div id="plot"></div>;
}

export default memo(Plot, (prevProps, nextProps) => {
  const isXSame = prevProps.xData.equals(nextProps.xData);
  const isYSame = prevProps.yData.equals(nextProps.yData);
  // shouldCommponentUpdate()와 반대로 동작
  // props가 같으면 true 반환, 서로 다르면 false 반환
  // 즉 true를 반환하면 rerender 되지 않음.
  // false를 반환하면 rerender 됨.
  return isXSame && isYSame
});
