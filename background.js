// RTL Wizard v3.0 — Background Service Worker
// Developed by: Ghareeb Aleleiwi

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({ id:'rtlwiz',        title:'🧙 RTL Wizard',              contexts:['all'] });
    chrome.contextMenus.create({ id:'rtl-rtl',  parentId:'rtlwiz', title:'▶ RTL (Right to Left)', contexts:['all'] });
    chrome.contextMenus.create({ id:'rtl-ltr',  parentId:'rtlwiz', title:'▶ LTR (Left to Right)', contexts:['all'] });
    chrome.contextMenus.create({ id:'rtl-auto', parentId:'rtlwiz', title:'▶ AUTO',                contexts:['all'] });
    chrome.contextMenus.create({ id:'rtl-off',  parentId:'rtlwiz', title:'▶ OFF',                 contexts:['all'] });
});

const modeMap = { 'rtl-rtl':'RTL', 'rtl-ltr':'LTR', 'rtl-auto':'AUTO', 'rtl-off':'OFF' };

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const mode = modeMap[info.menuItemId];
    if (!mode) return;
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (m) => {
            document.querySelectorAll('.wiz-mdbtn').forEach(b => {
                if (b.dataset.mode === m) b.click();
            });
        },
        args: [mode]
    });
});
