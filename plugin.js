function initalizePlugin() {
  document.querySelector('#fill-erp-create-application')
    .addEventListener('click', function() {

      chrome.tabs.executeScript(null, {file: 'fill-application-form-erp.js'});
    });
}

document.addEventListener("DOMContentLoaded", initalizePlugin);