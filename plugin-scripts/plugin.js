"use strict";

function initializePlugin() {

    document.querySelector('#help-me')
        .addEventListener('click', () => {
            chrome.tabs.getSelected(null, tabs => {
                chrome.tabs.sendMessage(tabs.id, {action: "help"});
            });
        });
}

document.addEventListener("DOMContentLoaded", initializePlugin);