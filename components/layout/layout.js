import { Fragment } from "react";
import MainNavigation from "./main-navigation";

function Layout(props) {
  return (
    <Fragment>
      <div id='page-top' />
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
