import React from "react";
import TabView from "../components/TabView";
import Course1 from "./Course1";
import Course2 from "./Course2";
import Course3 from "./Course3";

const Svg = () => (
  <TabView
    courses={[
      {
        href: "#course1",
        label: "1",
        component: <Course1 />,
      },
      {
        href: "#course2",
        label: "2",
        component: <Course2 />,
      },
      {
        href: "#course3",
        label: "3",
        component: <Course3 />,
      },
    ]}
  />
);

export default Svg;
