import "./App.css";

import React from "react";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import { OIDC_CONFIG } from "./config";
import Board from "./pages/Board";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Topic from "./pages/Topic";

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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AuthProvider {...OIDC_CONFIG}>
        <Router>
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
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
