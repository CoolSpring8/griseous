import * as React from "react";
import { AuthProvider } from "react-oidc-context";
import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { OIDC_CONFIG } from "./config";
import Board from "./pages/Board";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Topic from "./pages/Topic";

function Routes(): JSX.Element {
  const history = useHistory();

  return (
    <AuthProvider
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...OIDC_CONFIG}
      onSigninCallback={(user) => {
        history.push(user?.state.intended);
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/topic/:id/:page?">
          <Topic />
        </PrivateRoute>
        <PrivateRoute path="/board/:id/:page?">
          <Board />
        </PrivateRoute>
        <PrivateRoute exact path="/search">
          <Search />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default Routes;
