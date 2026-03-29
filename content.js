let isEnabled = false;

chrome.storage.local.get(['isEnabled'], (result) => {
    isEnabled = result.isEnabled !== false;
    if (isEnabled) {
        initializeExtension();
    }
});


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
        showError(event.data);
    }
}

function initializeExtension() {
    
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("injected.js");
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);

    container = document.createElement("div");
    container.id = "error-container";
    document.documentElement.appendChild(container);

    window.addEventListener("message", handleMessage);
}

function disableExtension() {
    
    if (container) {
        container.innerHTML = '';
        container.remove();
    }

    window.removeEventListener("message", handleMessage);
}

function showError(errorData) {
    const elmnt = document.createElement("div");
    elmnt.className = "error-toast";
    
    const errorName = errorData.errorName || "Error";
    const message = errorData.message || "Unknown error";
    const source = errorData.source ? ` (${errorData.source}` : "";
    const location = errorData.line ? `${source}:${errorData.line}:${errorData.column})` : source ? `${source})` : "";

    elmnt.innerHTML = `
        <div class="title"><span class="close-btn">❌</span> <span class="error-name">${errorName}</span></div>
        <div class="msg">${message}</div>
        ${location ? `<div class="location">${location}</div>` : ""}
    `;

    elmnt.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-btn")) {
            elmnt.classList.add("fade-out");
            setTimeout(() => elmnt.remove(), 400);
        }
    });

    container.appendChild(elmnt);
}
