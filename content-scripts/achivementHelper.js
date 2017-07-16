let achievementId = 0;

class AchivementHelper {
  static renderAchievementContainer() {
    if (!document.querySelector('.achievement-container')) {
      const container = '<div class="achievement-container"></div>';
      document.body.insertAdjacentHTML('beforeend', container);
      document.querySelector('.achievement-container').addEventListener('click', e => {
        if (e.target.classList.contains('hide-achievement')) {
          e.target.parentNode.remove();
        }
      });
    }

    return document.querySelector('.achievement-container');
  }

  static renderAchievement(object) {
    achievementId++;
    const body = `
    <div class="achievement" id="achievement_${achievementId}">
        <div class="achievement-image">
            <img src="${object.icon}" alt="">
        </div>
        <div class="achievement-name">
            ${object.name}
        </div>
        <div class="achievement-description">
            ${object.description}
        </div>
        <div class="hide-achievement">&times;</div>
    </div>
    `;
    AchivementHelper.renderAchievementContainer().insertAdjacentHTML('beforeend', body);

    setTimeout(() => {
      let id = achievementId;
      document.querySelector(`#achievement_${id}`).classList.add('achievement-appear')
    }, 100);
    // setTimeout(() => {
    //   let id = achievementId;
    //   document.querySelector(`#achievement_${id}`).remove();
    // }, 10000)
  }

  static check404() {
    if(document.querySelector('img[src="/img/dancing_bear.gif"]')){
      const port = chrome.extension.connect();
      port.postMessage(
        {
          'class': 'achievment',
          'method': 'on404'
        }
      );
      port.disconnect();
    }
  }
}