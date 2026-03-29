
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['isEnabled'], (result) => {
        if (result.isEnabled === undefined) {
            // enabled default first install
            chrome.storage.local.set({ isEnabled: true });
            updateToolbarIcon(true);
        } else {
            updateToolbarIcon(result.isEnabled);
        }
    });
});


chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get(['isEnabled'], (result) => {
        const currentState = result.isEnabled === false;
        const newState = currentState;

        chrome.storage.local.set({ isEnabled: newState });

        updateToolbarIcon(newState);

        chrome.tabs.sendMessage(tab.id, {
            action: 'toggle',
            isEnabled: newState
        }).catch(() => {
            // Content script might not be loaded on this tab
        });
    });
});

function updateToolbarIcon(isEnabled) {
    if (isEnabled) {
        chrome.action.setTitle({ title: 'JS Error Notifications (ENABLED)' });
        // chrome.action.setBadgeText({ text: 'ON' });
        // chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' });
    } else {
        chrome.action.setTitle({ title: 'JS Error Notifications (DISABLED)' });
        // chrome.action.setBadgeText({ text: 'OFF' });
        // chrome.action.setBadgeBackgroundColor({ color: '#f44336' });
    }
}


chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.isEnabled) {
        updateToolbarIcon(changes.isEnabled.newValue);
    }
});
