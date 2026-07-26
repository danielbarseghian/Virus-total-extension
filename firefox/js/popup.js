const input = document.getElementById("apiKey");
const button = document.getElementById("okButton");

button.addEventListener("click", async () => {

    await chrome.storage.local.set({
        apiKey: input.value
    });

    window.location.href = "main.html";
});

document.addEventListener("DOMContentLoaded", async () => {
    const { apiKey } = await chrome.storage.local.get("apiKey");

    if (apiKey) {
        input.value = apiKey;

        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            if (changeInfo.status === "complete" && tab.url) {
                console.log(tab.url);
            }
        });

        window.location.href = "main.html";
    }
});