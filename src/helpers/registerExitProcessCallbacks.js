"use strict";
exports.__esModule = true;
function registerExitProcessCallbacks(callbacks) {
    var exitCallback = function () {
        callbacks.forEach(function (cb) { return cb(); });
    };
    process.on('SIGINT', exitCallback);
    process.on('SIGTERM', exitCallback);
}
exports.registerExitProcessCallbacks = registerExitProcessCallbacks;
