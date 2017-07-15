window.onload = function() {

  window.application = {
    onFilled: (data) => {
      const currentCount = +localStorage.getItem(`${data.type}_applications_created`);
      localStorage.setItem(`${data.type}_applications_created`, currentCount + 1);
    }
  };

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

  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(factory);
  });
};