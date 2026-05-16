# Contributing to RTL Wizard

Thank you for your interest in contributing! Here's how to get started.

---

## 🐛 Reporting Bugs

1. Check [existing issues](https://github.com/ghareebanwar/RTL-Wizard/issues) first
2. Open a new issue with:
   - Browser version and OS
   - Website where the bug occurs
   - Steps to reproduce
   - Expected vs actual behavior

---

## 💡 Suggesting Features

Open an issue with the label `enhancement` and describe:
- The problem you're trying to solve
- Your proposed solution
- Any relevant RTL language or script context

---

## 🔧 Development Setup

```bash
# 1. Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/RTL-Wizard.git

# 2. Load in Chrome
# Open chrome://extensions/
# Enable Developer mode
# Click "Load unpacked" → select the cloned folder

# 3. Make your changes to content.js or background.js
# Chrome reloads the extension automatically on file save
```

---

## 📋 Pull Request Guidelines

- One feature or fix per PR
- Test on at least 2 different websites
- Test with Arabic, Hebrew, or another RTL language
- Keep commit messages clear:
  - `fix: correct AUTO mode detection for nested elements`
  - `feat: add support for Tifinagh script`
  - `docs: update README installation steps`

---

## 🌍 Adding RTL Script Support

To add a new RTL Unicode range, edit `content.js`:

```javascript
const RTL_REGEX = /[\u0590-\u05FF ... YOUR_NEW_RANGE]/;
```

Reference: [Unicode RTL Scripts](https://www.unicode.org/reports/tr9/)

---

## 📄 License

By contributing, you agree your code will be licensed under the [MIT License](LICENSE).
