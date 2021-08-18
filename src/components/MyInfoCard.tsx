import { useReactOidc } from "@axa-fr/react-oidc-context";
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
function LogIn({ logInFunc }: { logInFunc: Function }): JSX.Element {
  return (
    <button type="button" onClick={() => logInFunc()}>
      登录
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
function LogOut({ logOutFunc }: { logOutFunc: Function }): JSX.Element {
  return (
    <button type="button" onClick={() => logOutFunc()}>
      退出
    </button>
  );
}

function MyInfoCard(): JSX.Element {
  const { login, logout, oidcUser } = useReactOidc();

  if (oidcUser === null) {
    return <LogIn logInFunc={login} />;
  }

  return (
    <div>
      <LogOut logOutFunc={logout} />
    </div>
  );
}

export default MyInfoCard;
