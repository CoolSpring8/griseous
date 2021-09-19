import * as React from "react";
import { useAuth } from "react-oidc-context";
import { Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }: any): JSX.Element {
  const auth = useAuth();
  if (auth.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() =>
        auth.isAuthenticated ? (
          children
        ) : (
          <div>
            <p>请先登录</p>
            <p>3秒后自动跳转……</p>
            {setTimeout(auth.signinRedirect, 3000) && null}
          </div>
        )
      }
    />
  );
}

export default PrivateRoute;
