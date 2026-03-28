
window.onerror = function (msg, src, line, col, err) {
    const fileName = src.split(/[\/\\]/).pop();
    window.postMessage({
        type: "JS_ERROR",
        message: `${msg} (${fileName} ${line}:${col})`
    }, "*");
};

window.onunhandledrejection = function (e) {
    window.postMessage({
        type: "JS_ERROR",
        message: `Promise: ${e.reason}`
    }, "*");
};

