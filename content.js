// inject script into page
const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = () => script.remove();
(document.head || document.documentElement).appendChild(script);

// UI container
const container = document.createElement("div");
container.id = "error-container";
document.documentElement.appendChild(container);

// listen for errors from injected script
window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type === "JS_ERROR") {
        showError(event.data.message);
    }
});

function showError(message) {
    const el = document.createElement("div");
    el.className = "error-toast";

    el.innerHTML = `
        <div class="title">⚠️ JS ERROR</div>
        <div class="msg">${message}</div>
    `;

    container.appendChild(el);

    // setTimeout(() => {
    //     el.classList.add("fade-out");
    //     setTimeout(() => el.remove(), 400);
    // }, 4000);
}