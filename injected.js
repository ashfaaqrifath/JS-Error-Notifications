// runs in page context (this is the key)

window.onerror = function (msg, src, line, col, err) {
    window.postMessage({
        type: "JS_ERROR",
        message: `${msg} (${line}:${col})`
    }, "*");
};

window.onunhandledrejection = function (e) {
    window.postMessage({
        type: "JS_ERROR",
        message: `Promise: ${e.reason}`
    }, "*");
};

// TEST
// setTimeout(() => {
//     undefinedFunctionTest();
// }, 2000);