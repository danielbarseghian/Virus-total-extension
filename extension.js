const input = document.getElementById("apiKey");
const button = document.getElementById("okButton");
const status = document.getElementById("status");

// Load saved key
document.addEventListener("DOMContentLoaded", async () => {
    const { apiKey } = await chrome.storage.local.get("apiKey");

    if (apiKey) {
        input.value = apiKey;
        window.location.href = "main.html";
    }
});

// Save key
button.addEventListener("click", async () => {
    const apiKey = input.value.trim();

    if (!apiKey) {
        status.textContent = "Please enter an API key.";
        status.style.color = "red";
        return;
    }

    await chrome.storage.local.set({ apiKey });

    status.textContent = "API key saved!";
    status.style.color = "green";
});