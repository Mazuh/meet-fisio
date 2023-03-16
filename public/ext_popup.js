const launcher = document.getElementById("meet_fisio_ext_popup-launch-btn");

launcher.addEventListener("click", async () => {
  const tabs = await window.chrome.tabs.query({ active: true });
  if (tabs.length !== 1) {
    console.error("Unexpected amount of active tabs.", tabs.length);
    return;
  }

  const [tab] = tabs;
  if (!(tab.url || "").startsWith("https://meet.google.com")) {
    window.alert(
      "To enable Meet Fisio, you must be in a Google Meet room first. It seems that you're in a different website right now."
    );
    return;
  }

  try {
    console.log("Sending start message to tab:", tab.id, tab);
    await window.chrome.tabs.sendMessage(tab.id, "Meet-Fisio__start");
    console.log("Sent start message.");
  } catch (error) {
    console.error("Failed to send start message.", error);
  }
});
