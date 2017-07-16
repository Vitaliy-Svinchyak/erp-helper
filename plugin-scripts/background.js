window.onload = function() {

  let statisticForAchievments = {
    reroller: [],
  };

  const achievments = {
    reroller: {
      icon: 'https://image.flaticon.com/icons/svg/297/297558.svg',
      name: 'Рероллер-мотороллер',
      description: 'Заполнить форму Application 10 раз за 10 секунд',
    },
    page_404: {
      icon: 'https://image.flaticon.com/icons/svg/103/103085.svg',
      name: 'Опаньки',
      description: 'Попасть на страницу 404',
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
  window.achievment = {
    on404: () => {
      const audioVariants = [
        'big_smo_working',
        'come_on_over',
        'oh_no',
        'everybody_dance_now',
        'rompasso_angetenar',
        'uptown_funk',
        'bear_song',
        'dance_with_bear',
        'pod_drum_legko',
        'pritoptat',
        'yadrenost'
      ];
      const audioName = audioVariants[Math.floor(Math.random() * audioVariants.length)];
      (new Audio(`audio/${audioName}.mp3`)).play();

      if (localStorage.getItem('404_achievment')) {
        return false;
      }

      chrome.tabs.getSelected(null, function(tabs) {
        chrome.tabs.sendMessage(tabs.id, {action: "achievement", data: achievments.page_404});
      });
      localStorage.setItem('404_achievment', 1);
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

  chrome.tabs.onUpdated.addListener(function(tabId,) {
    chrome.tabs.sendMessage(tabId, {action: "check404"});
  });
};
