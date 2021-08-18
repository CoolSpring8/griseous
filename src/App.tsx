import "./App.css";

import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { OIDC_CONFIG } from "./config";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LocalStorage from "./utils/LocalStorage";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider
        configuration={OIDC_CONFIG}
        loggerLevel={oidcLog.DEBUG}
        UserStore={LocalStorage}
      >
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
}

export default App;
