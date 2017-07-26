"use strict";

const idToTip = {
    'add-household-bill': 'Добавляет ведомость'
};
const textToTip = {
    'Debts amount total': 'Настройки: <br> maximum_debt_amount',
    'Debts count total': 'Настройки: <br> maximum_active_debts',
    'Loans amount total': 'Настройки: <br> maximum_loan_amount',
    'Loans count total': 'Настройки: <br> maximum_active_loans',
    'Total monthly payments': 'Настройки: <br> maximum_loan_monthly_amount',
    'Worst status in last 12 months': 'Настройки: <br> worst_status',
    'Guarantee Debts amount total': 'Настройки: <br> maximum_debt_amount_guarantee <br> to_check_debt_amount_guarantee',
    'Guarantee Debts count total': 'Настройки: <br> maximum_active_debts_guarantee',
    'Guarantee Loans amount total': 'Настройки: <br> maximum_loan_amount_guarantee',
    'Guarantee Loans count total': 'Настройки: <br> maximum_active_loans_guarantee',
    'Guarantee Total monthly payments': 'Настройки: <br> maximum_loan_monthly_amount_guarantee',
    'Guarantee Worst status in last 12 months': 'Настройки: <br> worst_status_guarantee',
};

class TipsManager {

    static route(element) {
        TipsManager.element = element;
        return TipsManager.detectById() || TipsManager.detectByText();
    }

    static detectById() {
        if (idToTip.hasOwnProperty(TipsManager.element.id)) {
            TipsManager.showTip(idToTip[TipsManager.element.id]);

            return true;
        }

        return false;
    }

    static detectByText() {
        let text = TipsManager.element.textContent.trim().replace(/\s{2,}/, ' ');
        if (textToTip.hasOwnProperty(text)) {
            TipsManager.showTip(textToTip[text]);

            return true;
        }

        return false;
    }

    static showTip(text) {
        const container = TipsManager.renderTipContainer();
        const rect = TipsManager.element.getBoundingClientRect();
        let minusTop = 35;

        if (text.indexOf('<br>')) {
            minusTop += (text.split(/<br>/).length - 1) * 15;
        }

        container.style.top = rect.top - minusTop + 'px';
        container.style.left = rect.left + 'px';
        container.innerHTML = text;

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