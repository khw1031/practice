import React from "react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

const Tab = ({ href, label, hash }) => {
  return (
    <styles.tab isCurrent={hash === href}>
      <styles.link to={href}>{label}</styles.link>
    </styles.tab>
  );
};

const Tabs = () => {
  const t = [
    { href: "#1", label: "1" },
    { href: "#2", label: "2" },
    { href: "#3", label: "3" },
    { href: "#4", label: "4" },
  ];
  const hash = useLocation().hash || t[0].href;
  return (
    <styles.tabs>
      {t.map(({ href, label }) => (
        <Tab key={href} href={href} label={label} hash={hash} />
      ))}
    </styles.tabs>
  );
};

const TabView = props => {
  return (
    <styles.div>
      <Tabs />
    </styles.div>
  );
};

export default TabView;

const styles = {
  div: styled.div``,
  tabs: styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: space-between;
  `,
  tab: styled.li`
    flex-basis: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: ${props => (props.isCurrent ? 0 : "1px solid #efefef")};
    background-color: ${props => (props.isCurrent ? "#fff" : "#efefef")};
    border-top: 1px solid #efefef;
    & + & {
      border-left: 1px solid #efefef;
    }
  `,
  link: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    text-decoration: none;
  `,
};
