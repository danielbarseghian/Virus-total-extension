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

  fetch(`https://www.virustotal.com/api/v3/domains/${domain}`, options)
    .then(res => res.json())
    .then(json => {
      const results = json.data.attributes.last_analysis_results;
      let harmful = 0;
      let total = 0;

      for (const [engine, result] of Object.entries(results)) {
        total += 1;
        if (result.category === "malicious") {
          harmful += 1;
        }
      }

      console.log(`Malicious: ${harmful} total: ${total}`);

      if (harmful > 0 && harmful < 4) {
        console.log("YELLOW");
      } 
      else if (harmful >= 4) {
        console.log("RED");
      }
      else {
        console.log("GREEN GIANT");
      }
    })
    .catch(err => console.error(err));
});