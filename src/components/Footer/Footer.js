import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
// import Wrapper from '../Wrapper/Wrapper';

import classes from "./Footer.module.css";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noreferrer"
        className={classes.icon}
      >
        <FaFacebook />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
        className={classes.icon}
      >
        <FaTwitter className={classes.icon} />
      </a>
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer"
        className={classes.icon}
      >
        <FaLinkedinIn className={classes.icon} />
      </a>
      <p className={classes.footerText}>
        Copyright &copy; {date} SoftUni React course project
      </p>
    </footer>
  );
}
