function initalizePlugin() {

    if (localStorage.getItem('audio') === null) {
        localStorage.setItem('audio', 1);
    }

    if (+localStorage.getItem('audio') === 0) {
        document.querySelector('#toggle-music img').src = 'icons/speaker-off.svg';
    }

    document.querySelector('#fill-erp-create-application')
        .addEventListener('click', () => {
            chrome.tabs.getSelected(null, tabs => {
                chrome.tabs.sendMessage(tabs.id, {action: "application"});
            });
        });

    document.querySelector('#fill-todo')
        .addEventListener('click', () => {
            chrome.tabs.getSelected(null, tabs => {
                chrome.tabs.sendMessage(tabs.id, {action: "todo"});
            });
        });

    document.querySelector('#toggle-music img').addEventListener('click', () => {
        if (+localStorage.getItem('audio') === 0) {
            localStorage.setItem('audio', 1);
            document.querySelector('#toggle-music img').src = 'icons/speaker-on.svg';
        } else {
            localStorage.setItem('audio', 0);
            document.querySelector('#toggle-music img').src = 'icons/speaker-off.svg';
        }
    });
}

document.addEventListener("DOMContentLoaded", initalizePlugin);