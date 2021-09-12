import "./App.css";

import React from "react";
import { AuthProvider } from "react-oidc-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import { OIDC_CONFIG } from "./config";
import Board from "./pages/Board";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
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
          <div className="bg-gray-50">
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
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
