class TipsManager {

  static route(element) {
    TipsManager.element = element;

    switch (element.id) {
      case 'add-household-bill':
        TipsManager.showTip('добавляет ведомость');
        return;
    }
  }

  static showTip(text) {
    const container = TipsManager.renderTipContainer();
    const rect = TipsManager.element.getBoundingClientRect();
    container.style.top = rect.top - 35 + 'px';
    container.style.left = rect.left + 'px';
    container.innerText = text;

    TipsManager.element.addEventListener('mouseout', TipsManager.hideTipContainer);
  }

  static renderTipContainer() {
    if (!document.querySelector('.tip-container')) {
      const container = '<div class="tip-container"></div>';
      document.body.insertAdjacentHTML('beforeend', container);
    }

    return document.querySelector('.tip-container');
  }

  static hideTipContainer() {
    document.querySelector('.tip-container').innerText = '';
    document.querySelector('.tip-container').style.left = '-9999px';
  }
}