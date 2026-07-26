# VirusTotal Extension

A browser extension that uses the VirusTotal API to scan the site you're currently on and tell you whether it's safe to use.

## How It Works

The extension listens for the browser's tab/URL updates. Every time you navigate to a new page, it sends the URL to the VirusTotal API using your key, checks how many security vendors have flagged it, and shows a color-coded result.

## Color Coding

| Color     | Meaning                                  |
|-----------|-------------------------------------------|
| 🟢 Green  | 0 vendors flagged the URL                 |
| 🟡 Yellow | 1–3 vendors flagged the URL               |
| 🔴 Red    | 4+ vendors flagged the URL                |

## How to Use

### 1. Clone this repo

```bash
git clone https://github.com/your-username/Virus-total-extension.git
```

### 2. Load the extension

**Chrome**
1. Go to `chrome://extensions`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select the cloned folder.

*(screenshot)*

**Firefox**
1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on**.
3. Select the `manifest.json` file inside the cloned folder.

*(screenshot)*

### 3. Add your VirusTotal API key

1. Get a free API key from your VirusTotal profile: https://www.virustotal.com/gui/my-apikey
2. Open the extension, paste in your key, and save it. It's stored locally in your browser, so you don't have to put it again :)
3. Browse normally. The extension scans each site automatically as you visit it.

## Issues

Found a bug or have a feature request? Please open one on the [Issues tab](../../issues).