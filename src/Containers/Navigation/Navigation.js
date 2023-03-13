import { useState } from "react";
import { useAuth } from "../../state/Auth";

// import Logo from "../../assets/logo/logo.jsx";
import Wrapper from "../../components/Wrapper/Wrapper";
import NavLink from "../../components/UI/NavLink/NavLink";
import Separator from "../../components/Separator/Separator";
import { BsBoxes } from "react-icons/bs";

import classes from "./Navigation.module.css";

const unRegistered = [
  { name: "LOGIN", path: "/login" },
  { name: "SIGN UP", path: "/signup" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACTS", path: "/contact" },
];

const registered = [
  { name: "HOME", path: "/" },
  { name: "CREATE", path: "/create" },
  { name: "MY ARTICLES", path: "/my-articles" },
  { name: "PROFILE", path: "/profile" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACTS", path: "/contact" },
];

export default function Navigation() {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuth();
  let links = unRegistered;
  const hamburgerClasses = [classes.hamburger];
  const sidebarClasses = [classes.sidebar];

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const closeHandler = () => {
    setToggle(false);
  };

  if (user) {
    links = registered;
  }

  if (toggle) {
    hamburgerClasses.push(classes.open);
    sidebarClasses.push(classes.show);
  }
  return (
    <>
      <nav className={sidebarClasses.join(" ")} onClick={closeHandler}>
        <ul>
          {links.map((l) => {
            return (
              <li key={l.name}>
                <NavLink href={l.path} addClass="side">
                  {l.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <header className={classes.header}>
        <Wrapper addClass="flex">
          <div className={classes.menu} onClick={toggleHandler}>
            <div className={hamburgerClasses.join(" ")}></div>
          </div>
          <div onClick={closeHandler}>
            <NavLink href="/">
              {/* <img src={Logo} alt="logo" /> */}
              <BsBoxes className={classes.logo} />
            </NavLink>
          </div>
          <nav className={classes.nav}>
            <ul className={classes.navbar}>
              {links.map((l) => {
                return (
                  <li key={l.name}>
                    <NavLink href={l.path} addClass="link">
                      {l.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Wrapper>
        <Separator />
      </header>
    </>
  );
}
