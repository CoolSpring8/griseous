import "./App.css";

import { StyledEngineProvider } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./Routes";

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
      <StyledEngineProvider injectFirst>
        <Router>
          <Routes />
        </Router>
      </StyledEngineProvider>
    </QueryClientProvider>
  );
}

export default App;
