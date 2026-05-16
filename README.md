<div align="center">

<img src="icons/icon128.png" width="96" alt="RTL Wizard Logo" />

# RTL Wizard

**Professional bidirectional text direction control for Arabic, Hebrew, Persian, Urdu, and 200+ RTL languages**

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/ojcbbhpcljbeeijfebjcfcphbljmefno?label=Chrome%20Web%20Store&logo=googlechrome&logoColor=white&color=16a085)](https://chromewebstore.google.com/detail/rtl-wizard/ojcbbhpcljbeeijfebjcfcphbljmefno)
[![Rating](https://img.shields.io/chrome-web-store/rating/ojcbbhpcljbeeijfebjcfcphbljmefno?color=f1c40f&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/rtl-wizard/ojcbbhpcljbeeijfebjcfcphbljmefno)
[![Users](https://img.shields.io/chrome-web-store/users/ojcbbhpcljbeeijfebjcfcphbljmefno?color=2980b9&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/rtl-wizard/ojcbbhpcljbeeijfebjcfcphbljmefno)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-3.0.0-8e44ad)](https://github.com/ghareebanwar/RTL-Wizard/releases)

<a href="https://chromewebstore.google.com/detail/rtl-wizard/ojcbbhpcljbeeijfebjcfcphbljmefno">
  <img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png" alt="Available in the Chrome Web Store" width="200" />
</a>

</div>

---

## ✨ Features

### 4 Direction Modes
| Mode | Behavior |
|------|----------|
| `OFF` | Disable all direction overrides |
| `RTL` | Force Right-to-Left on all text elements |
| `LTR` | Force Left-to-Right on all text elements |
| `AUTO` | Smart per-element detection based on content |

### Controls
- **Left-click** the pill button → cycle modes
- **Right-click** the pill button → open settings panel
- **Right-click** any page → RTL Wizard context menu
- `Ctrl+Shift+R` → cycle modes
- `Ctrl+Shift+1` → OFF &nbsp;|&nbsp; `Ctrl+Shift+2` → RTL &nbsp;|&nbsp; `Ctrl+Shift+3` → LTR &nbsp;|&nbsp; `Ctrl+Shift+4` → AUTO

### Smart Detection
- Auto-detect language **while typing** in any input
- Auto-detect **page language** from `lang` / `dir` attributes
- Smart exceptions — code blocks, links, and dates stay LTR

### Customization
- Button position (4 corners), size (40–100px), and color
- Quick Themes: 🌙 Arabic &nbsp;|&nbsp; 🌐 English &nbsp;|&nbsp; 🔀 Mixed
- Import / Export settings as JSON

### Additional Features
- Per-site memory (different mode per domain)
- Excluded sites blacklist
- Night mode (auto-activates after 18:00)
- Focus mode (dims distractions)
- Sound feedback (toggleable)
- Toast notifications on mode switch
- Usage statistics + switch history (last 50 entries)
- Developer mode with console logs

---

## 🌍 Supported RTL Scripts

| Script | Languages |
|--------|-----------|
| Arabic | Arabic, Urdu, Persian/Farsi, Pashto, Kurdish (Sorani), Sindhi, Uyghur, and more |
| Hebrew | Hebrew, Yiddish, Ladino |
| Syriac | Syriac, Assyrian, Aramaic, Turoyo |
| Thaana | Dhivehi (Maldives) |
| NKo | Manding, Bambara, Dyula |
| Adlam | Fula / Fulani |
| Hanifi Rohingya | Rohingya |
| Mende Kikakui | Mende |
| Samaritan | Samaritan Hebrew / Aramaic |
| Mandaic | Mandaic, Neo-Mandaic |
| Yezidi | Yazidi Kurdish |

---

## 🚀 Installation

### From Chrome Web Store (Recommended)
[**Install RTL Wizard →**](https://chromewebstore.google.com/detail/rtl-wizard/ojcbbhpcljbeeijfebjcfcphbljmefno)

### Manual (Developer Mode)
1. Clone or [download this repo](https://github.com/ghareebanwar/RTL-Wizard/archive/refs/heads/main.zip)
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** → select the project folder

---

## 🗂 File Structure

```
RTL-Wizard/
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── manifest.json
├── content.js
├── background.js
├── README.md
└── LICENSE
```

---

## 📋 Changelog

### v3.0.0 (May 2026)
- Added context menu (right-click any page)
- Added excluded sites blacklist
- Added Quick Themes (Arabic, English, Mixed)
- Added Import/Export settings (JSON)
- Added Focus Mode
- Added Developer Mode with console logging
- Added Switch History log (last 50 entries)
- Added Toast notifications
- Added keyboard shortcuts `Ctrl+Shift+1–4`
- Added auto page language detection
- Improved UI with tabbed dark-theme settings panel
- Firefox / Edge compatible API

### v1.0.0 (May 2026)
- Initial release
- 4 modes: OFF, RTL, LTR, AUTO
- Per-site memory
- Customizable floating button
- Sound feedback
- Night mode
- Usage statistics

---

## 👨‍💻 Developer

**Ghareeb Aleleiwi**
Firmware & Electronics Engineer
📧 ghareebanwar@yahoo.com

---

## 📄 License

[MIT License](LICENSE) — Free and open source