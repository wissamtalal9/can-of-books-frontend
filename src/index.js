import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    redirectUri="https://quizzical-kare-7f2d20.netlify.app/"
  >
    <App />,
  </Auth0Provider>,
  document.getElementById("root")
);
