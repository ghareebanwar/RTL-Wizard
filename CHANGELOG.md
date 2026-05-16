# Changelog

All notable changes to RTL Wizard are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [3.0.0] - 2026-05-10

### Added
- Context menu on right-click anywhere on the page
- Excluded sites blacklist (disable extension per domain)
- Quick Themes: Arabic 🌙, English 🌐, Mixed 🔀
- Import / Export settings as JSON
- Focus Mode (dims non-content elements)
- Developer Mode with detailed console logging
- Switch History log (last 50 entries)
- Toast notifications on every mode switch
- Keyboard shortcuts: `Ctrl+Shift+1` → OFF, `2` → RTL, `3` → LTR, `4` → AUTO
- Auto page language detection via `lang` and `dir` HTML attributes
- Firefox / Edge compatible browser API

### Improved
- Tabbed settings panel with dark theme
- AUTO mode now uses `MutationObserver` for dynamic content
- Broader RTL script coverage (11 scripts, 200+ languages)

---

## [1.0.0] - 2026-05-09

### Added
- Initial release
- 4 direction modes: OFF, RTL, LTR, AUTO
- Floating pill button with left-click cycling
- Per-site mode memory using `localStorage`
- Customizable button: position, size, color
- Sound feedback on mode switch
- Night mode (auto-activates after 18:00)
- Usage statistics (switches per mode)
- `Ctrl+Shift+R` keyboard shortcut
- Smart LTR exceptions: code blocks, links, inputs, dates
