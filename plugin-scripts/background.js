window.onload = function() {

  let statisticForAchievments = {
    reroller: [],
  };

  const achievments = {
    reroller: {
      icon: 'https://image.flaticon.com/icons/svg/297/297558.svg',
      name: 'Рероллер-мотороллер',
      description: 'Заполнить форму Application 10 раз за 10 секунд',
    }
  };

  window.application = {
    onFilled: (data) => {
      const currentCount = +localStorage.getItem(`${data.type}_applications_filled`);
      localStorage.setItem(`${data.type}_applications_created`, currentCount + 1);
      window.application.saveFillingTime();

      window.application.checkAchievments();
    },

    saveFillingTime(){
      if (localStorage.getItem('reroller_achievment')) {
        return false;
      }

      const currentHistory = statisticForAchievments.reroller;
      currentHistory.push((new Date()).getTime());

      if (currentHistory.length > 10) {
        currentHistory.shift();
      }
    },


    checkAchievments: () => {
      if (localStorage.getItem('reroller_achievment')) {
        return false;
      }

      const currentHistory = statisticForAchievments.reroller;

      if (currentHistory.length === 10 && currentHistory[0] > +(new Date()).getTime() - 10000) {
        (new Audio('audio/rolling.mp3')).play();

        chrome.tabs.getSelected(null, function(tabs) {
          chrome.tabs.sendMessage(tabs.id, {action: "achievement", data: achievments.reroller});
        });
        localStorage.setItem('reroller_achievment', 1);
      }
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
