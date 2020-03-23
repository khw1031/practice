import React from "react";
import TabView from "../components/TabView";
import Flex1 from "./flex1";
import Flex2 from "./flex2";
import Flex3 from "./flex3";

const courses = [
  { href: "#1", label: "1", component: <Flex1 /> },
  { href: "#2", label: "2", component: <Flex2 /> },
  { href: "#3", label: "3", component: <Flex3 /> },
];

const Flex = () => <TabView courses={courses} />;

export default Flex;
