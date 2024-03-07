import Logo from "./logo";
import Link from "next/link";
import classes from "../../styles/main-navigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/' legacyBehavior>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>All Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
