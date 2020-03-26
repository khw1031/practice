import React from "react";
import TabView from "../components/TabView";
import C1 from "./C1";
export default () => (
  <TabView
    courses={[
      {
        href: "#1",
        label: "1",
        component: <C1 />,
      },
    ]}
  />
);
