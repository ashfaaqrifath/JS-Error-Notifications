
window.onerror = function (msg, src, line, col, err) {
    const fileName = src.split(/[\/\\]/).pop();
    
    let errorName = "Error";
    if (err && err.name) {
        errorName = err.name;
    } 
    else if (msg) {
        // Fallback: try to extract from message if it starts with error name
        const match = msg.match(/^(TypeError|ReferenceError|SyntaxError|RangeError|URIError|EvalError|DOMException|NotAllowedError|NotFoundError|SecurityError|NetworkError|AggregateError):/);
        if (match) {
            errorName = match[1];
        }
    }
    
    window.postMessage({
        type: "JS_ERROR",
        errorName: errorName,
        message: msg,
        source: fileName,
        line: line,
        column: col
    }, "*");
};

window.onunhandledrejection = function (e) {
    let errorName = "AggregateError";
    let message = String(e.reason);
    
    
    if (e.reason && typeof e.reason === 'object' && e.reason.name) {
        errorName = e.reason.name;
        message = e.reason.message || message;
    }
    
    window.postMessage({
        type: "JS_ERROR",
        errorName: errorName,
        message: `Unhandled Promise Rejection: ${message}`
    }, "*");
};

