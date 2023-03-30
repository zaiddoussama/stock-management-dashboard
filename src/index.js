import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { getConfig } from "./config";
import AuthProvider from "./hooks/AuthProvider";


const config = getConfig();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
