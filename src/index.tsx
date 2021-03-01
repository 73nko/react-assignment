import React from "react";
import ReactDOM from "react-dom";

import { AppProvider } from "./app/appContext";

import "./index.css";
import App from "./app/app";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
