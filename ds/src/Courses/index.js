import React from "react";
import TabView from "../components/TabView";
import Course1 from "./Course1";
export default () => (
  <TabView
    courses={[
      {
        href: "#course1",
        label: "1",
        component: <Course1 />,
      },
    ]}
  />
);
