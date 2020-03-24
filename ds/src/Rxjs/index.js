import React from "react";
import TabView from "../components/TabView";
import Rx1 from "./Rx1";
import Rx2 from "./Rx2";
import Rx3 from "./Rx3";
import Rx4 from "./Rx4";

const courses = [
  { href: "#1", label: "1", component: <Rx1 /> },
  { href: "#2", label: "2", component: <Rx2 /> },
  { href: "#3", label: "3", component: <Rx3 /> },
  { href: "#4", label: "4", component: <Rx4 /> },
];

const Rxjs = () => <TabView courses={courses} />;

export default Rxjs;
