function initalizePlugin() {
  document.querySelector('#fill-erp-create-application')
    .addEventListener('click', function() {
      chrome.tabs.getSelected(null, function(tabs) {
        chrome.tabs.sendMessage(tabs.id, { action: "application" });
      });
      // chrome.tabs.executeScript(null, {file: 'fill-application-form.js'});
    });

  document.querySelector('#fill-todo')
    .addEventListener('click', function() {
      chrome.tabs.getSelected(null, function(tabs) {
        chrome.tabs.sendMessage(tabs.id, { action: "todo" });
      });
      // chrome.tabs.executeScript(null, {file: 'fill-todo-form.js'});
    });
}

document.addEventListener("DOMContentLoaded", initalizePlugin);