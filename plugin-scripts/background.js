"use strict";
window.onload = function () {

    /**
     * @param {{class,data,method}}options
     */
    const factory = (options) => {
        if (options && options.class && options.method) {
            if (options.data) {
                window[options.class][options.method](options.data);
            }
            else {
                window[options.class][options.method]();
            }
        }
    };

    chrome.extension.onConnect.addListener(function (port) {
        port.onMessage.addListener(factory);
    });
};
