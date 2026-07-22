chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete" || !tab.url) return;

    const { apiKey } = await chrome.storage.local.get("apiKey");

    if (!apiKey) return;

    const domain = new URL(tab.url).hostname;

    console.log(domain);

    const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
        "x-apikey": apiKey
    }
    };

    var res = fetch(`https://www.virustotal.com/api/v3/urls/${domain}`, options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
});

