// RTL Wizard Extension v3.0
// Developed by: Ghareeb Aleleiwi
// Firmware & Electronics Engineer at Gilbarco Veeder-Root
// May 2026
//
// Supported RTL Scripts & Languages:
// ┌──────────────────┬────────────────────────────────────────────────────┐
// │ Script           │ Languages                                          │
// ├──────────────────┼────────────────────────────────────────────────────┤
// │ Arabic           │ Arabic, Urdu, Persian/Farsi, Pashto,               │
// │                  │ Kurdish (Sorani), Sindhi, Uyghur,                  │
// │                  │ Punjabi (Shahmukhi), Balochi, Kashmiri,            │
// │                  │ Mazanderani, Gilaki, Azerbaijani (Arabic)          │
// │ Hebrew           │ Hebrew, Yiddish, Ladino                            │
// │ Syriac           │ Syriac, Assyrian, Aramaic, Turoyo                  │
// │ Thaana           │ Dhivehi (Maldives)                                 │
// │ NKo              │ Manding, Bambara, Dyula (West Africa)              │
// │ Samaritan        │ Samaritan Hebrew, Samaritan Aramaic                │
// │ Mandaic          │ Mandaic, Neo-Mandaic                               │
// │ Adlam            │ Fula / Fulani (West & Central Africa)              │
// │ Hanifi Rohingya  │ Rohingya (Myanmar / Bangladesh)                    │
// │ Mende Kikakui    │ Mende (Sierra Leone)                               │
// │ Yezidi           │ Yazidi Kurdish                                     │
// └──────────────────┴────────────────────────────────────────────────────┘

(function () {
    'use strict';

    // ══════════════════════════════════════════════════════════════════
    // RTL UNICODE RANGES — All modern RTL scripts
    // ══════════════════════════════════════════════════════════════════
    const RTL_REGEX = /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F\u0750-\u077F\u0780-\u07BF\u07C0-\u07FF\u0800-\u083F\u0840-\u085F\u0860-\u086F\u0870-\u089F\u08A0-\u08FF\uFB1D-\uFB4F\uFB50-\uFDFF\uFE70-\uFEFF]/;

    const SCRIPT_NAMES = {
        arabic:    'Arabic / عربي',
        hebrew:    'Hebrew / עברית',
        syriac:    'Syriac / ܣܘܪܝܬ',
        thaana:    'Thaana / ދިވެހި',
        nko:       "N'Ko / ߒߞߏ",
        samaritan: 'Samaritan',
        mandaic:   'Mandaic',
        adlam:     'Adlam / 𞤀𞤣𞤤𞤢𞤥',
        rohingya:  'Rohingya',
        mende:     'Mende Kikakui',
        yezidi:    'Yezidi',
    };

    function detectScript(text) {
        if (/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text)) return 'arabic';
        if (/[\u0590-\u05FF\uFB1D-\uFB4F]/.test(text)) return 'hebrew';
        if (/[\u0700-\u074F\u0860-\u086F]/.test(text)) return 'syriac';
        if (/[\u0780-\u07BF]/.test(text)) return 'thaana';
        if (/[\u07C0-\u07FF]/.test(text)) return 'nko';
        if (/[\u0800-\u083F]/.test(text)) return 'samaritan';
        if (/[\u0840-\u085F]/.test(text)) return 'mandaic';
        return null;
    }

    // ══════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ══════════════════════════════════════════════════════════════════
    const MODES       = ['OFF', 'RTL', 'LTR', 'AUTO'];
    const MODE_COLORS = { OFF: '#555566', RTL: '#16a085', LTR: '#2980b9', AUTO: '#8e44ad' };
    const POSITIONS   = {
        top_left:     { top: '20px',   left: '20px',  right: 'auto', bottom: 'auto' },
        top_right:    { top: '20px',   right: '20px', left: 'auto',  bottom: 'auto' },
        bottom_left:  { bottom: '90px',left: '20px',  right: 'auto', top: 'auto'    },
        bottom_right: { bottom: '90px',right: '20px', left: 'auto',  top: 'auto'    },
    };
    const THEMES = {
        arabic:  { mode: 'RTL',  color: '#16a085', position: 'bottom_right' },
        english: { mode: 'LTR',  color: '#2980b9', position: 'bottom_left'  },
        mixed:   { mode: 'AUTO', color: '#8e44ad', position: 'top_right'    },
    };
    const RTL_LANG_CODES = ['ar','fa','he','ur','ps','ku','sd','yi','ug','dv','ff','rhg'];
    const EXCLUDED_KEY   = 'rtlwiz_excluded';
    const hostname       = window.location.hostname;

    // ══════════════════════════════════════════════════════════════════
    // LOAD SETTINGS
    // ══════════════════════════════════════════════════════════════════
    let currentMode    = localStorage.getItem('rtlwiz_mode_' + hostname) || 'AUTO';
    let buttonPosition = localStorage.getItem('rtlwiz_position') || 'bottom_left';
    let buttonColor    = localStorage.getItem('rtlwiz_color')    || MODE_COLORS.RTL;
    let buttonSize     = parseInt(localStorage.getItem('rtlwiz_size')) || 52;
    let soundEnabled   = localStorage.getItem('rtlwiz_sound')    !== 'false';
    let autoDetect     = localStorage.getItem('rtlwiz_auto')     === 'true';
    let darkMode       = localStorage.getItem('rtlwiz_dark')     === 'true';
    let focusMode      = localStorage.getItem('rtlwiz_focus')    === 'true';
    let devMode        = localStorage.getItem('rtlwiz_dev')      === 'true';
    let autoLangDetect = localStorage.getItem('rtlwiz_autolang') === 'true';
    let excludedSites  = JSON.parse(localStorage.getItem(EXCLUDED_KEY) || '[]');
    let stats          = JSON.parse(localStorage.getItem('rtlwiz_stats') || '{"switches":0,"rtl":0,"ltr":0,"auto":0,"off":0}');
    let switchHistory  = JSON.parse(localStorage.getItem('rtlwiz_history') || '[]');
    let listObserver = null;

    if (excludedSites.includes(hostname)) return;

    const hour = new Date().getHours();
    if (darkMode && (hour >= 18 || hour < 6)) buttonColor = '#1a1a2e';

    // Auto page language detection
    function detectPageLanguage() {
        const lang = document.documentElement.getAttribute('lang') || '';
        const dir  = document.documentElement.getAttribute('dir')  || '';
        const isRTL = RTL_LANG_CODES.some(c => lang.startsWith(c)) || dir === 'rtl';
        if (isRTL && !localStorage.getItem('rtlwiz_mode_' + hostname)) {
            currentMode = 'RTL';
            localStorage.setItem('rtlwiz_mode_' + hostname, 'RTL');
        }
    }
    if (autoLangDetect) detectPageLanguage();

    // ══════════════════════════════════════════════════════════════════
    // HELPERS
    // ══════════════════════════════════════════════════════════════════
    function playSound(freq) {
        if (!soundEnabled) return;
        try {
            const ctx  = new AudioContext();
            const osc  = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain); gain.connect(ctx.destination);
            osc.frequency.value = freq || 520;
            gain.gain.setValueAtTime(0.07, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(); osc.stop(ctx.currentTime + 0.15);
        } catch(e) {}
    }

    function showToast(msg, color) {
        const old = document.getElementById('rtlwiz-toast');
        if (old) old.remove();
        const t = document.createElement('div');
        t.id = 'rtlwiz-toast';
        t.innerHTML = msg;
        t.style.cssText = [
            'position:fixed','bottom:28px','left:50%',
            'transform:translateX(-50%) translateY(16px)',
            'background:' + (color||'#1a1a22'),
            'color:#fff','padding:10px 24px',
            'border-radius:30px','font-size:13px','font-weight:600',
            'z-index:2147483647','box-shadow:0 6px 24px rgba(0,0,0,0.4)',
            "font-family:'Segoe UI',sans-serif",'letter-spacing:0.3px',
            'opacity:0','transition:all 0.28s cubic-bezier(.4,0,.2,1)',
            'pointer-events:none','border:1px solid rgba(255,255,255,0.08)'
        ].join(';');
        document.body.appendChild(t);
        requestAnimationFrame(() => {
            t.style.opacity = '1';
            t.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(() => {
            t.style.opacity = '0';
            t.style.transform = 'translateX(-50%) translateY(10px)';
            setTimeout(() => t.remove(), 300);
        }, 2200);
    }

    function addHistory(from, to) {
        switchHistory.unshift({ time: new Date().toLocaleString(), site: hostname, from, to });
        if (switchHistory.length > 50) switchHistory.pop();
        localStorage.setItem('rtlwiz_history', JSON.stringify(switchHistory));
    }

    function applyFocusMode(enable) {
        let fs = document.getElementById('rtlwiz-focus-style');
        if (!fs) { fs = document.createElement('style'); fs.id = 'rtlwiz-focus-style'; document.head.appendChild(fs); }
        fs.textContent = enable ? `
            body > *:not([id^="rtlwiz"]) { opacity:0.1!important; pointer-events:none!important; transition:opacity 0.4s!important; }
            main,article,[role="main"] { opacity:1!important; pointer-events:auto!important; }
        ` : '';
    }

    // ══════════════════════════════════════════════════════════════════
    // APPLY MODE
    // ══════════════════════════════════════════════════════════════════
    function applyMode() {
    let s = document.getElementById('rtlwiz-style');
    if (!s) { s = document.createElement('style'); s.id = 'rtlwiz-style'; document.head.appendChild(s); }

    if (currentMode === 'OFF') {
        s.textContent = '';
        document.querySelectorAll('[dir]').forEach(el => {
            if (!el.id || !el.id.startsWith('rtlwiz')) el.removeAttribute('dir');
        });

    } else if (currentMode === 'RTL') {
        s.textContent = `
            p, span, li, h1, h2, h3, h4, h5, h6,
            td, th, blockquote, label, a {
                direction: rtl !important;
                text-align: right !important;
                unicode-bidi: embed !important;
            }
            code, pre, code *, pre *,
            [class*="code"], [class*="Code"],
            [class*="syntax"], [class*="highlight"],
            [class*="prism"], [class*="hljs"],
            [class*="language-"], [class*="cm-"],
            [class*="editor"], [class*="Editor"],
            [class*="artifact"], [class*="Artifact"],
            [class*="monaco"], kbd, samp,
            textarea, input, a[href], time, [datetime] {
                direction: ltr !important;
                text-align: left !important;
                unicode-bidi: embed !important;
            }
        `;

    } else if (currentMode === 'LTR') {
        s.textContent = `* { direction: ltr !important; text-align: left !important; }`;

    } else if (currentMode === 'AUTO') {
        // Remove direction from CSS — let fixListItems handle it via dir attribute
        s.textContent = `
            ul, ol {
                padding-right: 1.5em !important;
                padding-left: 0 !important;
            }
            [dir="rtl"] {
                text-align: right !important;
                unicode-bidi: embed !important;
            }
            [dir="ltr"] {
                text-align: left !important;
                unicode-bidi: embed !important;
            }
        `;
        setTimeout(fixListItems, 100);
        setTimeout(fixListItems, 600);
        setTimeout(fixListItems, 1500);
        startListObserver();
    }

    if (devMode) console.info('[RTL Wizard] Mode:', currentMode, '| Site:', hostname);
}

    function startListObserver() {
        if (listObserver) return;
        listObserver = new MutationObserver(() => {
            if (currentMode === 'AUTO') {
                clearTimeout(listObserver._timer);
                listObserver._timer = setTimeout(fixListItems, 100);
            }
        });
        listObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    function fixListItems() {
        if (currentMode !== 'AUTO') return;
        
        // Target all text-containing elements including nested ones
        const selector = 'p, li, h1, h2, h3, h4, h5, h6, td, th, blockquote, div[class*="prose"], div[class*="message"], div[class*="content"], div[class*="text"], span[class*="text"]';
        
        document.querySelectorAll(selector).forEach(el => {
            // Skip code blocks and extension elements
            if (el.closest('pre, code, [class*="code"], [class*="editor"], [class*="artifact"], [id^="rtlwiz"]')) return;
            // Skip if has child block elements (process children instead)
            if (el.querySelector('p, li, h1, h2, h3, h4, h5, h6')) return;
            
            const text = el.textContent.trim();
            if (!text) return;
            
            // If ANY RTL character exists → RTL
            if (RTL_REGEX.test(text)) {
                el.setAttribute('dir', 'rtl');
            } else {
                el.setAttribute('dir', 'ltr');
            }
        });
    }

    function setMode(mode, silent) {
        const prev = currentMode;
        currentMode = mode;
        localStorage.setItem('rtlwiz_mode_' + hostname, mode);

        // Update pill UI
        const label = document.getElementById('rtlwiz-label');
        const dot   = document.getElementById('rtlwiz-dot');
        const pill  = document.getElementById('rtlwiz-pill');
        if (label) label.textContent = mode;
        if (dot)   dot.style.background = MODE_COLORS[mode];
        if (pill)  pill.style.setProperty('--wiz-clr', MODE_COLORS[mode]);

        // Update mode buttons in panel
        document.querySelectorAll('.wiz-mdbtn').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

        if (!silent) {
            stats.switches++;
            stats[mode.toLowerCase()]++;
            localStorage.setItem('rtlwiz_stats', JSON.stringify(stats));
            addHistory(prev, mode);
            const freqs = { OFF: 300, RTL: 620, LTR: 700, AUTO: 500 };
            playSound(freqs[mode]);
            showToast('RTL Wizard &rarr; <b>' + mode + '</b>', MODE_COLORS[mode]);
        }
        applyMode();
        if (currentMode === 'AUTO') setTimeout(fixListItems, 300);
    }

    // Make setMode globally accessible immediately
    window.rtlwizSetMode = function(mode) { setMode(mode); };
    window.rtlwizTab     = function(name) {};  // placeholder, overridden in buildPanel
    window.rtlwizTheme   = function(name) {};  // placeholder, overridden in buildPanel
    window.rtlwizRemoveSite = function(i) {};  // placeholder, overridden in buildPanel

        window.rtlwizTheme = function(name) {
        const t = THEMES[name];
        buttonPosition = t.position;
        buttonColor    = t.color;
        localStorage.setItem('rtlwiz_position', buttonPosition);
        localStorage.setItem('rtlwiz_color', buttonColor);
        setMode(t.mode);
        showToast('Theme: ' + name, t.color);
    };

    window.rtlwizTab        = function(name) {};
    window.rtlwizRemoveSite = function(i) {};

    function startListObserver() {
        if (listObserver) return;
        listObserver = new MutationObserver(() => {
            if (currentMode === 'AUTO') {
                clearTimeout(listObserver._timer);
                listObserver._timer = setTimeout(fixListItems, 100);
            }
        });
        listObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    function exportSettings() {
        const data = {
            version: '3.0', exportedAt: new Date().toISOString(),
            mode: currentMode, position: buttonPosition, color: buttonColor,
            size: buttonSize, sound: soundEnabled, autoDetect, darkMode,
            focusMode, devMode, autoLangDetect, excludedSites, stats,
            history: switchHistory
        };
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
        a.download = 'rtl-wizard-v3-settings.json';
        a.click();
        showToast('⬇ Exported', '#16a085');
    }

    function importSettings(file) {
        const r = new FileReader();
        r.onload = e => {
            try {
                const s = JSON.parse(e.target.result);
                if (s.mode)          { currentMode    = s.mode;          localStorage.setItem('rtlwiz_mode_'+hostname, currentMode); }
                if (s.position)      { buttonPosition = s.position;      localStorage.setItem('rtlwiz_position', buttonPosition); }
                if (s.color)         { buttonColor    = s.color;         localStorage.setItem('rtlwiz_color', buttonColor); }
                if (s.size)          { buttonSize     = s.size;          localStorage.setItem('rtlwiz_size', buttonSize); }
                if (s.excludedSites) { excludedSites  = s.excludedSites; localStorage.setItem(EXCLUDED_KEY, JSON.stringify(excludedSites)); }
                if (s.stats)         { stats          = s.stats;         localStorage.setItem('rtlwiz_stats', JSON.stringify(stats)); }
                applyMode();
                showToast('⬆ Imported', '#16a085');
            } catch { showToast('Import failed', '#e74c3c'); }
        };
        r.readAsText(file);
    }

    // ══════════════════════════════════════════════════════════════════
    // MODERN PILL WIDGET
    // ══════════════════════════════════════════════════════════════════
    function injectWidgetCSS() {
        if (document.getElementById('rtlwiz-css')) return;
        const pos = POSITIONS[buttonPosition];
        const css = document.createElement('style');
        css.id = 'rtlwiz-css';
        css.textContent = `
        #rtlwiz-pill {
            position: fixed;
            top: ${pos.top}; bottom: ${pos.bottom};
            left: ${pos.left}; right: ${pos.right};
            z-index: 2147483647;
            display: flex; align-items: center;
            height: ${buttonSize}px;
            border-radius: ${buttonSize}px;
            background: #0d0d12;
            border: 1px solid rgba(255,255,255,0.07);
            box-shadow: 0 4px 20px rgba(0,0,0,0.55);
            cursor: pointer; user-select: none;
            font-family: 'Segoe UI',system-ui,sans-serif;
            overflow: hidden;
            transition: box-shadow 0.22s, transform 0.14s;
            --wiz-clr: ${MODE_COLORS[currentMode]};
        }
        #rtlwiz-pill:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(0,0,0,0.6), 0 0 0 2.5px var(--wiz-clr);
        }
        #rtlwiz-pill:active { transform: scale(0.95); }

        #rtlwiz-dot {
            width: ${buttonSize}px; min-width: ${buttonSize}px; height: ${buttonSize}px;
            border-radius: 50%;
            background: ${MODE_COLORS[currentMode]};
            display: flex; align-items: center; justify-content: center;
            transition: background 0.3s;
            position: relative; flex-shrink: 0;
        }
        #rtlwiz-dot::after {
            content: ''; position: absolute; inset: 7px;
            border-radius: 50%;
            border: 1.5px solid rgba(255,255,255,0.22);
        }
        #rtlwiz-dot-icon {
            width: ${Math.round(buttonSize*0.42)}px;
            height: ${Math.round(buttonSize*0.42)}px;
            fill: white; opacity: 0.92;
        }
        #rtlwiz-label {
            color: #ddd; font-size: ${Math.round(buttonSize*0.27)}px;
            font-weight: 700; letter-spacing: 0.9px;
            padding: 0 ${Math.round(buttonSize*0.3)}px 0 ${Math.round(buttonSize*0.16)}px;
            white-space: nowrap;
        }

        /* Panel */
        #rtlwiz-panel {
            position: fixed; z-index: 2147483646;
            width: 460px; max-height: 86vh; overflow-y: auto;
            background: #0d0d12;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 18px;
            box-shadow: 0 24px 64px rgba(0,0,0,0.75);
            padding: 22px; display: none;
            font-family: 'Segoe UI',system-ui,sans-serif;
            color: #ddd;
        }
        #rtlwiz-panel::-webkit-scrollbar { width:5px; }
        #rtlwiz-panel::-webkit-scrollbar-thumb { background:#222; border-radius:3px; }

        .wiz-head { display:flex; align-items:center; gap:10px; margin-bottom:3px; }
        .wiz-head h2 { margin:0; font-size:17px; font-weight:800; color:#fff; }
        .wiz-logo { width:30px; height:30px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:17px; }
        .wiz-sub { font-size:11px; color:#3a3a4a; margin:0 0 18px; }

        .wiz-tabs { display:flex; gap:3px; margin-bottom:16px; background:#0a0a10; padding:4px; border-radius:12px; }
        .wiz-tab { flex:1; padding:7px 4px; border:none; border-radius:9px; background:transparent; color:#444; font-size:11px; font-weight:700; cursor:pointer; transition:all 0.2s; letter-spacing:0.3px; }
        .wiz-tab.active { background:var(--wiz-clr,#16a085); color:#fff; }

        .wiz-tc { display:none; } .wiz-tc.active { display:block; }

        .wiz-sec { background:#111118; border-radius:12px; padding:14px; margin-bottom:10px; }
        .wiz-sec-title { font-size:9.5px; text-transform:uppercase; letter-spacing:1.3px; color:#333; margin:0 0 11px; font-weight:700; }

        .wiz-sec label { display:flex; align-items:center; gap:9px; font-size:12.5px; color:#999; margin:9px 0; cursor:pointer; }
        .wiz-sec input[type=checkbox] { width:15px; height:15px; accent-color:var(--wiz-clr,#16a085); cursor:pointer; flex-shrink:0; }
        .wiz-sec select, .wiz-sec input[type=text] {
            width:100%; padding:8px 11px; border-radius:9px;
            border:1px solid #1e1e28; background:#08080f; color:#ccc;
            font-size:12.5px; box-sizing:border-box; margin-top:5px;
        }
        .wiz-sec input[type=range] { width:100%; accent-color:var(--wiz-clr,#16a085); margin-top:5px; }
        .wiz-sec input[type=color] { width:100%; height:36px; border:none; border-radius:9px; cursor:pointer; margin-top:5px; }

        .wiz-btn-row { display:flex; gap:7px; flex-wrap:wrap; margin-top:7px; }
        .wiz-btn {
            flex:1; padding:9px; border:none; border-radius:9px;
            cursor:pointer; font-size:12px; font-weight:700; min-width:65px;
            transition:opacity 0.2s, transform 0.1s;
        }
        .wiz-btn:hover  { opacity:0.85; }
        .wiz-btn:active { transform:scale(0.96); }
        .btn-teal { background:#16a085; color:#fff; }
        .btn-blue { background:#2980b9; color:#fff; }
        .btn-red  { background:#c0392b; color:#fff; }
        .btn-gray { background:#1a1a25; color:#888; }

        /* Mode buttons */
        .wiz-mds { display:flex; gap:6px; }
        .wiz-mdbtn {
            flex:1; padding:10px; border:1.5px solid #1e1e2a; border-radius:10px;
            background:#08080f; color:#555; font-size:12px; font-weight:800;
            cursor:pointer; transition:all 0.2s; letter-spacing:0.6px;
        }
        .wiz-mdbtn:hover { color:#bbb; border-color:#333; }
        .wiz-mdbtn.active { border-color:var(--wiz-clr,#16a085); color:#fff; background:rgba(255,255,255,0.03); }

        /* Themes */
        .wiz-themes { display:flex; gap:7px; }
        .wiz-theme {
            flex:1; padding:12px 6px; border-radius:10px;
            border:1.5px solid #1e1e2a; background:#08080f;
            cursor:pointer; text-align:center; font-size:11.5px;
            font-weight:700; color:#666; transition:all 0.2s;
        }
        .wiz-theme:hover { color:#fff; }
        .wiz-theme .ti { font-size:18px; display:block; margin-bottom:3px; }

        /* Stats */
        .wiz-stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
        .wiz-stat-box { background:#08080f; border-radius:10px; padding:13px; text-align:center; }
        .wiz-stat-num { font-size:24px; font-weight:800; color:var(--wiz-clr,#16a085); display:block; }
        .wiz-stat-lbl { font-size:9.5px; color:#333; margin-top:2px; text-transform:uppercase; letter-spacing:1px; }

        /* History */
        .wiz-hist-item { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid #111118; font-size:11.5px; }
        .wiz-hist-item:last-child { border:none; }
        .wiz-hist-badge { font-size:10.5px; font-weight:700; padding:2px 8px; border-radius:20px; background:#111118; color:#aaa; }

        /* Site list */
        .wiz-site-item { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid #111118; font-size:12.5px; }
        .wiz-site-item:last-child { border:none; }
        .wiz-site-rm { background:#c0392b; border:none; color:#fff; border-radius:6px; padding:3px 9px; cursor:pointer; font-size:11px; font-weight:700; }
        .wiz-empty { color:#333; font-size:11.5px; padding:6px 0; }

        /* Lang badge */
        #rtlwiz-lang-badge {
            position:fixed; z-index:2147483645;
            background:#0d0d12; border:1px solid rgba(255,255,255,0.06);
            border-radius:20px; padding:4px 13px;
            font-size:11px; font-weight:600; color:#888;
            font-family:'Segoe UI',sans-serif;
            pointer-events:none; opacity:0;
            transition:opacity 0.3s;
        }
        `;
        document.head.appendChild(css);
    }

    function buildWidget() {
        if (document.getElementById('rtlwiz-pill')) return;
        if (!document.body) return;

        injectWidgetCSS();
        const pos = POSITIONS[buttonPosition];

        const pill = document.createElement('div');
        pill.id = 'rtlwiz-pill';
        pill.title = 'RTL Wizard  |  Left-click: toggle  |  Right-click: settings  |  Ctrl+Shift+R';
        pill.style.setProperty('--wiz-clr', MODE_COLORS[currentMode]);

        // Update position dynamically
        pill.style.top    = pos.top;
        pill.style.bottom = pos.bottom;
        pill.style.left   = pos.left;
        pill.style.right  = pos.right;

        pill.innerHTML = `
            <div id="rtlwiz-dot">
                <svg id="rtlwiz-dot-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4h9v2h-4v13h-2V6h-3zm-1 8H7V6H5v6H3v2h6zm0 5l-3-3v2H4v2h2v2z"/>
                </svg>
            </div>
            <span id="rtlwiz-label">${currentMode}</span>
        `;

        pill.addEventListener('click', e => {
            e.preventDefault(); e.stopPropagation();
            const idx = MODES.indexOf(currentMode);
            setMode(MODES[(idx + 1) % MODES.length]);
        });

        pill.addEventListener('contextmenu', e => {
            e.preventDefault();
            buildPanel();
            const panel = document.getElementById('rtlwiz-panel');
            if (!panel) return;
            const pr = pill.getBoundingClientRect();
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
            panel.style.setProperty('--wiz-clr', MODE_COLORS[currentMode]);
            if (pos.bottom !== 'auto') {
                panel.style.bottom = (window.innerHeight - pr.top + 8) + 'px';
                panel.style.top    = 'auto';
            } else {
                panel.style.top    = (pr.bottom + 8) + 'px';
                panel.style.bottom = 'auto';
            }
            panel.style.left  = pos.left  !== 'auto' ? pos.left  : 'auto';
            panel.style.right = pos.right !== 'auto' ? pos.right : 'auto';
        });

        document.body.appendChild(pill);
        applyMode();
        applyFocusMode(focusMode);

        console.info(
            '%c RTL Wizard v3.0 %c Ghareeb Aleleiwi ',
            'background:#16a085;color:#fff;padding:3px 8px;border-radius:4px 0 0 4px;font-weight:700',
            'background:#1a1a22;color:#aaa;padding:3px 8px;border-radius:0 4px 4px 0'
        );
    }

    // ══════════════════════════════════════════════════════════════════
    // SETTINGS PANEL
    // ══════════════════════════════════════════════════════════════════
    function buildPanel() {
        if (document.getElementById('rtlwiz-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'rtlwiz-panel';
        panel.style.setProperty('--wiz-clr', MODE_COLORS[currentMode]);

        panel.innerHTML = `
            <div class="wiz-head">
                <div class="wiz-logo" style="background:${MODE_COLORS[currentMode]}">🧙</div>
                <h2>RTL Wizard</h2>
            </div>
            <p class="wiz-sub">v3.0 &nbsp;·&nbsp; Ghareeb Aleleiwi &nbsp;·&nbsp; Gilbarco Veeder-Root</p>

            <div class="wiz-tabs">
                <button class="wiz-tab active" onclick="rtlwizTab('main')">Main</button>
                <button class="wiz-tab" onclick="rtlwizTab('style')">Style</button>
                <button class="wiz-tab" onclick="rtlwizTab('sites')">Sites</button>
                <button class="wiz-tab" onclick="rtlwizTab('stats')">Stats</button>
                <button class="wiz-tab" onclick="rtlwizTab('history')">History</button>
            </div>

            <!-- MAIN -->
            <div class="wiz-tc active" id="rtlwiz-tc-main">
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Direction Mode</div>
                    <div class="wiz-mds">
                        ${MODES.map(m=>`<button class="wiz-mdbtn${currentMode===m?' active':''}" data-mode="${m}" onclick="rtlwizSetMode('${m}')">${m}</button>`).join('')}
                    </div>
                </div>
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Quick Themes</div>
                    <div class="wiz-themes">
                        <div class="wiz-theme" onclick="rtlwizTheme('arabic')" style="border-color:#16a085"><span class="ti">🌙</span>Arabic</div>
                        <div class="wiz-theme" onclick="rtlwizTheme('english')" style="border-color:#2980b9"><span class="ti">🌐</span>English</div>
                        <div class="wiz-theme" onclick="rtlwizTheme('mixed')" style="border-color:#8e44ad"><span class="ti">🔀</span>Mixed</div>
                    </div>
                </div>
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Options</div>
                    <label><input type="checkbox" id="wiz-sound" ${soundEnabled?'checked':''}> Enable Sound</label>
                    <label><input type="checkbox" id="wiz-auto" ${autoDetect?'checked':''}> Auto-detect language while typing</label>
                    <label><input type="checkbox" id="wiz-autolang" ${autoLangDetect?'checked':''}> Auto-detect page language</label>
                    <label><input type="checkbox" id="wiz-dark" ${darkMode?'checked':''}> Night mode (18:00–06:00)</label>
                    <label><input type="checkbox" id="wiz-focus" ${focusMode?'checked':''}> Focus mode</label>
                    <label><input type="checkbox" id="wiz-dev" ${devMode?'checked':''}> Developer mode</label>
                </div>
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Import / Export</div>
                    <div class="wiz-btn-row">
                        <button class="wiz-btn btn-teal" id="wiz-export">⬇ Export</button>
                        <button class="wiz-btn btn-blue" id="wiz-import">⬆ Import</button>
                        <input type="file" id="wiz-import-file" accept=".json" style="display:none">
                    </div>
                </div>
            </div>

            <!-- STYLE -->
            <div class="wiz-tc" id="rtlwiz-tc-style">
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Position</div>
                    <select id="wiz-pos">
                        <option value="top_left">Top Left</option>
                        <option value="top_right">Top Right</option>
                        <option value="bottom_left">Bottom Left</option>
                        <option value="bottom_right">Bottom Right</option>
                    </select>
                </div>
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Size &nbsp;<span id="wiz-size-val">${buttonSize}</span>px</div>
                    <input type="range" id="wiz-size" min="40" max="100" value="${buttonSize}">
                </div>
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Color</div>
                    <input type="color" id="wiz-color" value="${buttonColor}">
                </div>
            </div>

            <!-- SITES -->
            <div class="wiz-tc" id="rtlwiz-tc-sites">
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Excluded Sites</div>
                    <div id="wiz-sites-list"></div>
                    <div class="wiz-btn-row" style="margin-top:10px">
                        <input type="text" id="wiz-new-site" placeholder="e.g. github.com" style="flex:2;margin-top:0">
                        <button class="wiz-btn btn-red" id="wiz-add-site" style="flex:1">Add</button>
                    </div>
                </div>
            </div>

            <!-- STATS -->
            <div class="wiz-tc" id="rtlwiz-tc-stats">
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Usage Statistics</div>
                    <div class="wiz-stat-grid">
                        <div class="wiz-stat-box"><span class="wiz-stat-num" id="s-total">0</span><div class="wiz-stat-lbl">Total</div></div>
                        <div class="wiz-stat-box"><span class="wiz-stat-num" id="s-rtl">0</span><div class="wiz-stat-lbl">RTL</div></div>
                        <div class="wiz-stat-box"><span class="wiz-stat-num" id="s-ltr">0</span><div class="wiz-stat-lbl">LTR</div></div>
                        <div class="wiz-stat-box"><span class="wiz-stat-num" id="s-auto">0</span><div class="wiz-stat-lbl">AUTO</div></div>
                    </div>
                    <div class="wiz-btn-row" style="margin-top:11px">
                        <button class="wiz-btn btn-red" id="wiz-reset-stats">Reset Stats</button>
                    </div>
                </div>
            </div>

            <!-- HISTORY -->
            <div class="wiz-tc" id="rtlwiz-tc-history">
                <div class="wiz-sec">
                    <div class="wiz-sec-title">Last 50 Switches</div>
                    <div id="wiz-history-list"></div>
                    <div class="wiz-btn-row" style="margin-top:11px">
                        <button class="wiz-btn btn-red" id="wiz-clear-history">Clear History</button>
                    </div>
                </div>
            </div>

            <div class="wiz-btn-row" style="margin-top:6px">
                <button class="wiz-btn btn-gray" id="wiz-close">Close</button>
            </div>
        `;

        document.body.appendChild(panel);

        // ── Global functions ──────────────────────────────────────────
        window.rtlwizTab = function(name) {
            const names = ['main','style','sites','stats','history'];
            panel.querySelectorAll('.wiz-tab').forEach((t,i)   => t.classList.toggle('active', names[i] === name));
            panel.querySelectorAll('.wiz-tc').forEach(c => c.classList.toggle('active', c.id === 'rtlwiz-tc-' + name));
            if (name==='stats')   renderStats();
            if (name==='history') renderHistory();
            if (name==='sites')   renderSites();
        };
        
        window.rtlwizRemoveSite = function(i) {
            excludedSites.splice(i, 1);
            localStorage.setItem(EXCLUDED_KEY, JSON.stringify(excludedSites));
            renderSites();
        };

        function renderStats() {
            document.getElementById('s-total').textContent = stats.switches;
            document.getElementById('s-rtl').textContent   = stats.rtl;
            document.getElementById('s-ltr').textContent   = stats.ltr;
            document.getElementById('s-auto').textContent  = stats.auto;
        }

        function renderHistory() {
            const list = document.getElementById('wiz-history-list');
            list.innerHTML = switchHistory.length
                ? switchHistory.map(h => `
                    <div class="wiz-hist-item">
                        <span style="color:#333">${h.time.split(',')[1]||h.time}</span>
                        <span style="color:#666">${h.site}</span>
                        <span class="wiz-hist-badge">${h.from}→${h.to}</span>
                    </div>`).join('')
                : '<div class="wiz-empty">No history yet.</div>';
        }

        function renderSites() {
            const list = document.getElementById('wiz-sites-list');
            list.innerHTML = excludedSites.length
                ? excludedSites.map((s,i) => `
                    <div class="wiz-site-item">
                        <span style="color:#aaa">${s}</span>
                        <button class="wiz-site-rm" onclick="rtlwizRemoveSite(${i})">Remove</button>
                    </div>`).join('')
                : '<div class="wiz-empty">No excluded sites.</div>';
        }

        // ── Wiring ────────────────────────────────────────────────────
        const posEl = document.getElementById('wiz-pos');
        posEl.value = buttonPosition;
        posEl.addEventListener('change', function() {
            buttonPosition = this.value;
            localStorage.setItem('rtlwiz_position', buttonPosition);
        });

        document.getElementById('wiz-size').addEventListener('input', function() {
            buttonSize = parseInt(this.value);
            document.getElementById('wiz-size-val').textContent = buttonSize;
            localStorage.setItem('rtlwiz_size', buttonSize);
        });

        document.getElementById('wiz-color').addEventListener('change', function() {
            buttonColor = this.value;
            localStorage.setItem('rtlwiz_color', buttonColor);
        });

        const toggleMap = {
            'wiz-sound':   () => { soundEnabled   = !soundEnabled;   localStorage.setItem('rtlwiz_sound',   soundEnabled); },
            'wiz-auto':    () => { autoDetect      = !autoDetect;      localStorage.setItem('rtlwiz_auto',    autoDetect); },
            'wiz-autolang':() => { autoLangDetect  = !autoLangDetect;  localStorage.setItem('rtlwiz_autolang',autoLangDetect); },
            'wiz-dark':    () => { darkMode         = !darkMode;        localStorage.setItem('rtlwiz_dark',    darkMode); },
            'wiz-focus':   () => { focusMode        = !focusMode;       localStorage.setItem('rtlwiz_focus',   focusMode); applyFocusMode(focusMode); },
            'wiz-dev':     () => { devMode          = !devMode;         localStorage.setItem('rtlwiz_dev',     devMode); },
        };
        Object.entries(toggleMap).forEach(([id, fn]) => document.getElementById(id)?.addEventListener('change', fn));

        document.getElementById('wiz-export').addEventListener('click', exportSettings);
        document.getElementById('wiz-import').addEventListener('click', () => document.getElementById('wiz-import-file').click());
        document.getElementById('wiz-import-file').addEventListener('change', function() { if (this.files[0]) importSettings(this.files[0]); });

        document.getElementById('wiz-add-site').addEventListener('click', () => {
            const site = document.getElementById('wiz-new-site').value.trim().toLowerCase();
            if (site && !excludedSites.includes(site)) {
                excludedSites.push(site);
                localStorage.setItem(EXCLUDED_KEY, JSON.stringify(excludedSites));
                document.getElementById('wiz-new-site').value = '';
                renderSites();
                showToast('Excluded: ' + site, '#c0392b');
            }
        });

        document.getElementById('wiz-reset-stats').addEventListener('click', () => {
            stats = { switches:0, rtl:0, ltr:0, auto:0, off:0 };
            localStorage.setItem('rtlwiz_stats', JSON.stringify(stats));
            renderStats();
            showToast('Stats reset', '#555');
        });

        document.getElementById('wiz-clear-history').addEventListener('click', () => {
            switchHistory = [];
            localStorage.setItem('rtlwiz_history', '[]');
            renderHistory();
            showToast('History cleared', '#555');
        });

        document.getElementById('wiz-close').addEventListener('click', () => panel.style.display = 'none');

        document.addEventListener('click', e => {
            const p  = document.getElementById('rtlwiz-pill');
            if (panel.style.display === 'block' && !panel.contains(e.target) && !p?.contains(e.target))
                panel.style.display = 'none';
        });
    }

    // ══════════════════════════════════════════════════════════════════
    // PERSISTENCE (SPA-safe)
    // ══════════════════════════════════════════════════════════════════
    setInterval(buildWidget, 700);
    setTimeout(buildWidget, 200);
    setTimeout(buildWidget, 800);
    setTimeout(buildWidget, 1600);

    // ══════════════════════════════════════════════════════════════════
    // KEYBOARD SHORTCUTS
    // ══════════════════════════════════════════════════════════════════
    document.addEventListener('keydown', e => {
        if (!e.ctrlKey || !e.shiftKey) return;
        e.preventDefault();
        switch (e.key) {
            case 'R': { const i = MODES.indexOf(currentMode); setMode(MODES[(i+1)%MODES.length]); break; }
            case '1': setMode('OFF');  break;
            case '2': setMode('RTL');  break;
            case '3': setMode('LTR');  break;
            case '4': setMode('AUTO'); break;
        }
    });

    // ══════════════════════════════════════════════════════════════════
    // AUTO-DETECT ON TYPING  (all 11 RTL scripts)
    // ══════════════════════════════════════════════════════════════════
    document.addEventListener('input', e => {
        if (!autoDetect) return;
        if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') return;
        const text = e.target.value;
        if (!text || text.length < 3) return;

        const rtlCount = (text.match(RTL_REGEX) || []).length;
        const ltrCount = (text.match(/[a-zA-Z]/g) || []).length;
        const detected = rtlCount > ltrCount ? 'RTL' : ltrCount > rtlCount ? 'LTR' : null;

        if (detected && detected !== currentMode) {
            const script   = detectScript(text);
            const langName = script ? SCRIPT_NAMES[script] : '';
            setMode(detected);
            if (langName) showToast('🔍 ' + langName, MODE_COLORS[detected]);
        }
    });

})();