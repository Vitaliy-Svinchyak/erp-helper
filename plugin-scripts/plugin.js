function initalizePlugin() {
  document.querySelector('#fill-erp-create-application')
    .addEventListener('click', function() {
      chrome.tabs.getSelected(null, function(tabs) {
        chrome.tabs.sendMessage(tabs.id, {action: "application"});
      });
    });

  document.querySelector('#fill-todo')
    .addEventListener('click', function() {
      chrome.tabs.getSelected(null, function(tabs) {
        chrome.tabs.sendMessage(tabs.id, {action: "todo"});
      });
    });
}

document.addEventListener("DOMContentLoaded", initalizePlugin);