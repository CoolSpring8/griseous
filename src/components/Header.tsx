import { BellIcon, LoginIcon, LogoutIcon } from "@heroicons/react/solid";
import * as React from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";

import usePathWithParams from "../hooks/usePathWithParams";
import logoURL from "../static/images/98logo.ico";
import SearchBar from "./SearchBar";

function Header(): JSX.Element {
  const auth = useAuth();
  const path = usePathWithParams();

  return (
    <header className="sticky top-0 z-40 bg-white flex space-x-4 pt-2.5 pb-2.5 mb-4">
      <Link
        to="/"
        className="inline-flex items-center flex-initial ml-4 space-x-1"
      >
        <img src={logoURL} alt="logo" className="invert w-9" />
        <span>CC98</span>
      </Link>
      <SearchBar />
      {auth.isAuthenticated ? (
        <div className="flex items-center flex-initial space-x-4 !mr-4">
          <Link to="/message/response">
            <BellIcon className="h-5 w-5" />
          </Link>
          <Link to="/usercenter">{auth.user?.profile?.name}</Link>
          <button type="button">
            <LogoutIcon className="h-5 w-5" onClick={auth.signoutPopup} />
          </button>
        </div>
      ) : (
        <div className="flex-initial space-x-1 !mr-4 flex">
          <button
            type="button"
            onClick={() => {
              auth.signinRedirect({
                state: {
                  intended: path,
                },
              });
            }}
          >
            登录
            <LoginIcon className="h-5 w-5 inline" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
