import "./App.css";

import { AuthenticationProvider, oidcLog } from "@axa-fr/react-oidc-context";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import { OIDC_CONFIG } from "./config";
import Board from "./pages/Board";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Topic from "./pages/Topic";
import LocalStorage from "./utils/LocalStorage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // make less requests in development
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider
        configuration={OIDC_CONFIG}
        loggerLevel={oidcLog.DEBUG}
        UserStore={LocalStorage}
      >
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/topic/:id/:page?">
              <Topic />
            </Route>
            <Route path="/board/:id/:page?">
              <Board />
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
