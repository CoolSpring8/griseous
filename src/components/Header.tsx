import * as React from "react";
import { Link } from "react-router-dom";

import logoURL from "../static/images/98logo.ico";

function Header(): JSX.Element {
  return (
    <header className="sticky z-50 top-0 w-full bg-white bg-opacity-90 backdrop-filter backdrop-blur flex">
      <Link to="/">
        <img src={logoURL} alt="Logo" className="invert" />
        <p>CC98</p>
      </Link>
      <input type="search" autoComplete="off" className="simple" />
    </header>
  );
}

export default Header;
