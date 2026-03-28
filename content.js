let isEnabled = true;

// Check if extension is enabled on page load
chrome.storage.local.get(['isEnabled'], (result) => {
    isEnabled = result.isEnabled !== false; // Default to enabled
    if (isEnabled) {
        initializeExtension();
    }
});

// Listen for toggle messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
        isEnabled = request.isEnabled;
        if (isEnabled) {
            initializeExtension();
        } else {
            disableExtension();
        }
    }
});

let container;

function handleMessage(event) {
    if (event.source !== window) return;
    if (event.data.type === "JS_ERROR") {
        showError(event.data.message);
    }
}

function initializeExtension() {
    // inject script into page
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("injected.js");
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);

    // UI container
    container = document.createElement("div");
    container.id = "error-container";
    document.documentElement.appendChild(container);

    // listen for errors from injected script
    window.addEventListener("message", handleMessage);
}

function disableExtension() {
    // Remove all error notifications
    if (container) {
        container.innerHTML = '';
        container.remove();
    }
    // Remove message listener
    window.removeEventListener("message", handleMessage);
}

function showError(message) {
    const el = document.createElement("div");
    el.className = "error-toast";

    el.innerHTML = `
        <div class="title"><span class="close-btn">⭕</span> JAVASCRIPT ERROR</div>
        <div class="msg">${message}</div>
    `;

    el.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-btn")) {
            el.classList.add("fade-out");
            setTimeout(() => el.remove(), 400);
        }
    });

    container.appendChild(el);
}