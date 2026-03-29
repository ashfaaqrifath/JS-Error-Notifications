# JS Error Notifications 🔔

A lightweight Chrome extension that catches JavaScript errors on any webpage and displays them as clean, in-page notifications — no more hunting through DevTools console.

---

## ✨ Features

- Detects JavaScript errors in real-time on any webpage
- Shows errors as visible notifications directly on the page
- Toggle on/off with a single click on the extension icon
- Works on all URLs — no configuration needed
- Lightweight with no external dependencies

---

## 📁 Project Structure

```
JS-Error-Notifications/
├── icons/                  # Extension icons (16px, 48px, 128px)
├── background.js           # Service worker — handles toggle state
├── content.js              # Injected into pages — manages notification display
├── injected.js             # Runs in page context — intercepts JS errors
├── styles.css              # Notification styles
└── manifest.json           # Chrome Extension Manifest V3 config
```

---

## 🚀 Installation (Load Unpacked)

1. Clone or download this repo
   ```bash
   git clone https://github.com/ashfaaqrifath/JS-Error-Notifications.git
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer Mode** (top right toggle)

4. Click **Load unpacked** and select the project folder

5. The extension is now active! Visit any webpage and JS errors will appear as notifications.

---

## 🔧 How It Works

| File | Role |
|------|------|
| `injected.js` | Hooks into the page's JS context to catch `window.onerror` and unhandled promise rejections |
| `content.js` | Receives error data and renders styled notification banners on the page |
| `background.js` | Service worker that manages the enabled/disabled toggle state via `chrome.storage` |
| `styles.css` | Styles for the notification UI |

---

## 🖱️ Usage

- **Click the extension icon** in the toolbar to toggle error notifications on/off
- When enabled, any JS error thrown on the current page will appear as a notification
- Works automatically on all websites — no setup required per site

---

## 🛠️ Tech Stack

- JavaScript (Manifest V3)
- Chrome Extensions API
- CSS

---

## 📄 License

MIT — free to use and modify.
