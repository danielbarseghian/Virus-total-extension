chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  const { apiKey } = await chrome.storage.local.get("apiKey");
  if (!apiKey) return;

  const domain = new URL(tab.url).hostname;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-apikey': apiKey
    }
  };

  console.log(`checking on ${domain}`);

  if (domain) {
    fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, options)
      .then(res => res.json())
      .then(json => {
        const results = json.data.attributes.last_analysis_results;
        let harmful = 0;
        let total = 0;
        let color;

        for (const [engine, result] of Object.entries(results)) {
          total += 1;
          if (result.category === "malicious") {
            harmful += 1;
          }
        }

        console.log(`Malicious: ${harmful} total: ${total}`);

        if (harmful > 0 && harmful < 4) {
          color = "#FFEE00";
        } 
        else if (harmful >= 4) {
          color = "#FF2D00";
        }
        else {
          color = "#12EB05"
        }
        
        chrome.action.setBadgeBackgroundColor({ color });
        chrome.action.setBadgeText({ text: harmful > 0 ? String(harmful) : "0" });

      })
      .catch(err => console.error(err));
    }
});