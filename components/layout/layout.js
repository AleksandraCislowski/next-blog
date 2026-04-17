import { Fragment } from "react";
import MainNavigation from "./main-navigation";
import classes from "../../styles/layout.module.css";

function Layout(props) {
  return (
    <Fragment>
      <div id='page-top' />
      <a className={classes.skipLink} href='#main-content'>
        Skip to content
      </a>
      <MainNavigation />
      <main id='main-content'>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
