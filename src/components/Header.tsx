import * as React from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";

import logoURL from "../static/images/98logo.ico";

function Header(): JSX.Element {
  const auth = useAuth();

  return (
    <header className="sticky z-50 top-0 w-full bg-white flex">
      <Link to="/">
        <img src={logoURL} alt="Logo" className="invert" />
        <span>CC98</span>
      </Link>
      <input type="search" autoComplete="off" className="simple" />
      {auth.isAuthenticated ? (
        <span>{auth.user?.profile?.name}</span>
      ) : (
        <button type="button" onClick={auth.signinRedirect}>
          登录
        </button>
      )}
    </header>
  );
}

export default Header;
