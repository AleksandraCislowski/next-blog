import { useState } from "react";
import Logo from "./logo";
import Link from "next/link";
import classes from "../../styles/main-navigation.module.css";

function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function keyDownHandler(event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  }

  return (
    <header className={classes.header}>
      <Link href='/' className={classes.brandLink} aria-label='Elsewhere Log home'>
        <Logo />
      </Link>
      <button
        className={classes.menuButton}
        type='button'
        aria-label='Toggle navigation menu'
        aria-controls='main-navigation'
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span aria-hidden='true' />
        <span aria-hidden='true' />
        <span aria-hidden='true' />
      </button>
      <nav
        id='main-navigation'
        className={`${classes.navigation} ${isMenuOpen ? classes.open : ""}`}
        aria-label='Main navigation'
        onKeyDown={keyDownHandler}
      >
        <ul>
          <li>
            <Link href='/#hero' onClick={closeMenu}>
              Highlights
            </Link>
          </li>
          <li>
            <Link href='/posts' onClick={closeMenu}>
              All Notes
            </Link>
          </li>
          <li>
            <Link href='/contact' onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
