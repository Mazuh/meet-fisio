const launcher = document.getElementById("meet_fisio_ext_popup-launch-btn");

launcher.addEventListener("click", async () => {
  const tabs = await window.chrome.tabs.query({ active: true });
  if (tabs.length !== 1) {
    console.error("Unexpected amount of active tabs.", tabs.length);
    return;
  }

  const [tab] = tabs;
  await window.chrome.tabs.sendMessage(tab.id, "Meet-Fisio__start");
  console.log("Sent message to tab:", tab);
});
