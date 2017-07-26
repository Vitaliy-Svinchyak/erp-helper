"use strict";

function initalizePlugin() {

    if (localStorage.getItem('audio') === null) {
        localStorage.setItem('audio', 1);
    }

    if (+localStorage.getItem('audio') === 0) {
      document.querySelector('#music-toggler-input').click();
    }

    document.querySelector('#fill-it')
        .addEventListener('click', () => {
            chrome.tabs.getSelected(null, tabs => {
                chrome.tabs.sendMessage(tabs.id, {action: "fill"});
            });
        });

    document.querySelector('#music-toggler-input').addEventListener('change', () => {
        if (+localStorage.getItem('audio') === 0) {
            localStorage.setItem('audio', 1);
        } else {
            localStorage.setItem('audio', 0);
            const port = chrome.extension.connect();
            port.postMessage(
                {
                    'class': 'application',
                    'method': 'pauseMusic'
                }
            );
            port.disconnect();
        }
    });
}

document.addEventListener("DOMContentLoaded", initalizePlugin);