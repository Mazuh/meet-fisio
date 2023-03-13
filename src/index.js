import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

try {
  const escapeHTMLPolicy = window.trustedTypes.createPolicy(
    "mazuh/meet-fisio",
    {
      createHTML: (code) => code,
    }
  );

  document.body.insertAdjacentHTML(
    "beforeend",
    escapeHTMLPolicy.createHTML("<div id='root-app-meet-fisio' />")
  );

  const root = ReactDOM.createRoot(
    document.getElementById("root-app-meet-fisio")
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log(
    "Enabling Meet Fisio for",
    window.location.href,
    "\nMade with ❤️ by Mazuh: https://github.com/Mazuh/meet-fisio"
  );
} catch (error) {
  console.error(
    "Failed to make Meet Fisio work. If you think this is wrong, open an issue at: https://github.com/Mazuh/meet-fisio \n Error:",
    error
  );
}
