/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";

const Tab = ({ href, label, hash }) => {
  return (
    <styles.tab isCurrent={hash === href}>
      <styles.link to={href}>{label}</styles.link>
    </styles.tab>
  );
};

const Tabs = ({ views }) => {
  const hash = useLocation().hash || views[0].href;
  return (
    <styles.tabs>
      {views.map(props => (
        <Tab key={props.href} hash={hash} {...props} />
      ))}
    </styles.tabs>
  );
};

const TabView = ({ courses }) => {
  const hash = useLocation().hash || courses[0].href;
  return (
    <styles.div>
      <Tabs views={courses} />
      <styles.content>
        {courses.find(({ href }) => href === hash).component}
      </styles.content>
    </styles.div>
  );
};

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
  content: styled.div`
    padding: 1rem;
  `,
};

export default TabView;
