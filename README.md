# 🧙 RTL Wizard v1.0

Professional bidirectional text direction control for Arabic, Persian, Hebrew, and Urdu users.

## ✨ Features

### Core
✅ 4 Modes: OFF / RTL / LTR / AUTO
✅ Works on ALL websites
✅ Per-site memory (different mode for each domain)
✅ Smart exceptions (code, links, dates stay LTR)

### Controls
✅ Left-click button → cycle modes
✅ Right-click button → open settings panel
✅ Keyboard shortcuts:
  - `Ctrl+Shift+R` → cycle modes
  - `Ctrl+Shift+1` → OFF
  - `Ctrl+Shift+2` → RTL
  - `Ctrl+Shift+3` → LTR
  - `Ctrl+Shift+4` → AUTO
✅ Right-click any page → RTL Wizard context menu

### Customization
✅ Button position (4 corners)
✅ Button size (50–120px)
✅ Button color picker
✅ Quick Themes: Arabic 🌙 / English 🌐 / Mixed 🔀
✅ Import / Export settings (JSON)

### Smart Features
✅ Auto-detect language while typing
✅ Auto-detect page language (lang/dir attributes)
✅ Blacklist sites (disable on specific domains)
✅ Night / Dark Mode (auto after 18:00)
✅ Focus Mode (dim distractions)
✅ Sound feedback (toggleable)
✅ Toast notifications on mode switch

### Statistics & History
✅ Usage statistics (total switches per mode)
✅ Switch history log (last 50 entries)
✅ Reset stats / clear history

### Developer
✅ Developer Mode (detailed console logs)
✅ Firefox / Edge compatible API

---

## 🚀 Installation

### From Chrome Web Store
[Install RTL Wizard](#) ← Link after publishing

### Manual (Developer Mode)
1. Download or clone this repo
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** → select the project folder

---

## 📖 Usage

| Action | Result |
|---|---|
| Left-click button | Cycle: OFF → RTL → LTR → AUTO |
| Right-click button | Open settings panel |
| `Ctrl+Shift+R` | Cycle modes |
| `Ctrl+Shift+1–4` | Set specific mode |
| Right-click page | RTL Wizard context menu |

---

## 🗂 File Structure

```
rtl-wizard/
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

### v2.0.0 (May 2026)
- Added context menu (right-click page)
- Added blacklist/excluded sites management
- Added Quick Themes (Arabic, English, Mixed)
- Added Import/Export settings (JSON)
- Added Focus Mode
- Added Developer Mode
- Added Switch History log (last 50 entries)
- Added Toast notifications
- Added multiple keyboard shortcuts (Ctrl+Shift+1–4)
- Added auto page language detection
- Added Firefox/Edge API compatibility
- Improved UI with tabbed settings panel (dark theme)

### v1.0.0 (May 2026)
- Initial release
- 4 modes: OFF, RTL, LTR, AUTO
- Per-site memory
- Customizable button
- Sound feedback
- Night mode
- Usage statistics

---

## 👨‍💻 Developer

**Ghareeb Aleleiwi**
Firmware & Electronics Engineer
Gilbarco Veeder-Root

---

## 📄 License

MIT License — Free and open source