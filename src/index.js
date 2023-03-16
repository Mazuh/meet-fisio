import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function enableMeetFisioExtension(isLocalhost) {
  try {
    const meetLinkRegex = /meet\.google\.com\/(?<room>(\w|\d|-)+).*$/;
    const localLinkRegex = /room=(?<room>(\w|\d|-)+)/;
    const { room } = (isLocalhost ? localLinkRegex : meetLinkRegex).exec(
      window.location.href
    )?.groups || { room: "" };

    if (!room && !isLocalhost) {
      window.alert(
        "To enable Meet Fisio, you must be in a Google Meet room first."
      );
      return;
    }

    if (!room && isLocalhost) {
      window.alert(
        "To enable Meet Fisio in localhost, add a query params to the URL with an unique UUID-like value. For example:\nhttp://localhost:3000/?room=aaa-bbb-ccc"
      );
      return;
    }

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
        <App room={room} />
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
}

if (window.location.hostname === "localhost") {
  enableMeetFisioExtension(true);
} else {
  window.chrome.runtime.onMessage.addListener(
    (message) =>
      message === "Meet-Fisio__start" && enableMeetFisioExtension(false)
  );
}
