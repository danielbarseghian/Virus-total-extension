import requests
import json

domain = "03284db.netsolhost.com"

headers = {
    "accept": "application/json",
    "x-apikey": "2b7138e09db123a3a570b0b60779e74c9eb6638a64572f3544b0536a96d1c755"
}

print("https://www.virustotal.com/api/v3/domains/" + domain)
datas = requests.get("https://www.virustotal.com/api/v3/domains/" + domain, headers=headers)

datas = datas.json()
analysis_results = datas['data']['attributes']['last_analysis_results']
total = 0
malicious = 0
clean = 0

for engine, info in analysis_results.items():
    if info['result'] == 'malicious':
        malicious += 1
        total += 1
    elif info['result'] == 'clean':
        clean += 1
        total += 1

print(f"{malicious}/{total} flagged it as malicious")