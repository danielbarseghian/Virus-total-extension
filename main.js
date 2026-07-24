document.addEventListener("DOMContentLoaded", async () => {
    const background = document.getElementById("background");
    const { lastColor } = await chrome.storage.local.get("lastColor");
    if (lastColor) background.style.color = lastColor;
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    const background = document.getElementById("background");
    console.log(`${msg.action}`);
    background.style.backgroundColor = msg.action;
});