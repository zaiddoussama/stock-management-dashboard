import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { getConfig } from "./config";
import AuthProvider from "./services/auth/AuthProvider";
import { Provider } from "react-redux";
import history from "./app/history";
import configureStore from "./app/store";

const config = getConfig();
const initialState = {};
const store = configureStore(initialState, history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider config={config}>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();
