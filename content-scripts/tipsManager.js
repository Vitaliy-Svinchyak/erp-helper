"use strict";

class TipsManager {

    static renderErrorTip() {
        if (!document.querySelector('.error-tip')) {
            const container =
                `<div class="error-tip">
                    <div class="error-circle">✖</div>
                    <span class="error-count">0</span>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', container);
        }

        const errorsCount = +document.querySelector('.error-tip .error-count').textContent;
        document.querySelector('.error-tip .error-count').textContent = (errorsCount + 1).toString();
    }

    static showHelp() {
        const html = `
                            <h1>Одна кнопка,чтобы править всеми</h1>
                            <h2>Возможности</h2>
                            <br>
                            <ol>
                                <li>Заполнять форму создания Application
                                    <ol>
                                        <li>erp (al, mk)</li>
                                        <li>web (al)</li>
                                    </ol>
                                </li>
                                <li>Заполнять форму Todo
                                    <ol>
                                        <li>Credit Db Manual Check (al)</li>
                                        <li>Id Document Check (al)</li>
                                        <li>Household Bill Check (al)</li>
                                        <li>Payslip Check (al)</li>
                                        <li>Client Primary Info (al, mk)</li>
                                        <li>Employer Info (al, mk)</li>
                                        <li>Bank Account (al, mk)</li>
                                        <li>Confirm Check (al)</li>
                                    </ol>
                                </li>
                                <li>Заполнять форму
                                    <ol>
                                        <li>Создание payment (al)</li>
                                        <li>Assign payment (al)</li>
                                        <li>Client registration (al)</li>
                                    </ol>
                                </li>
                                <li>Сочетания клавиш
                                    <ol>
                                        <li><strong>ctrl + Q</strong> - Заполнить форму</li>
                                        <li><strong>ctrl + B</strong> - Сгенерировать отчет об изменениях на форме в формате создания бага
                                            <ol>
                                                <li>В форме можно нажатием на строку исключить её из генерации</li>
                                                <li>По нажатию кнопки "Сгенерировать" под ней появится textarea с автофокусом, <br>
                                                из которой можно скопировать готовый текст</li>
                                            </ol>
                                        </li>
                                    </ol>
                                </li>
                            </ol>`;
        Helper.renderModal(html);
    }
}