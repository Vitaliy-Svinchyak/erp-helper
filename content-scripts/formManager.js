"use strict";
/** @var Helper Helper **/
class FormManager {

    constructor() {

        this.changeLog = {};
    }

    logInputChange(element) {
        const label = this.detectLabel(element);
        const date = new Date();
        const hours = Helper.generateZerosBeforeNumber(date.getHours(), 2);
        const minutes = Helper.generateZerosBeforeNumber(date.getMinutes(), 2);
        const seconds = Helper.generateZerosBeforeNumber(date.getSeconds(), 2);
        const time = `${hours}:${minutes}:${seconds}`;

        this.changeLog[this.getPathTo(element)] = {
            label: label,
            value: element.value,
            time: time
        };
    }

    detectLabel(element) {
        let label;

        if (element.id) {
            label = document.querySelector(`label[for="${element.id}"]`);
        }

        if (label) {
            return label.textContent;
        }

        let parentContainer = element.parentNode;
        for (let i = 0; i <= 5; i++) {
            const oneLabel = this.getOneLabelForTwoFields(parentContainer);
            if (oneLabel) {
                return oneLabel;
            }

            const tableStyleLabel = this.getTableStyleLabel(parentContainer);
            if (tableStyleLabel) {
                return tableStyleLabel;
            }

            const idDocumentStyleLabel = this.getIdDocumentStyleLabel(parentContainer);
            if (idDocumentStyleLabel) {
                return idDocumentStyleLabel;
            }

            parentContainer = parentContainer.parentNode;
        }

        return element.name;
    }

    getOneLabelForTwoFields(parentContainer) {
        if (parentContainer.children[0].tagName === 'LABEL') {
            const content = parentContainer.children[0].textContent.trim();

            if (content) {
                return content;
            }
        }

        return null;
    }

    getTableStyleLabel(parentContainer) {
        if (parentContainer.children[0].tagName === 'TD'
            && parentContainer.children.length
            && parentContainer.children[0].length) {

            const content = parentContainer.children[0].children[1].textContent.trim();

            if (content) {
                return content;
            }
        }

        return null;
    }

    getIdDocumentStyleLabel(parentContainer) {
        if (parentContainer.children[0].tagName === 'TD') {
            const content = parentContainer.children[0].textContent.trim();

            if (content) {
                return content;
            }
        }

        return null;
    }

    detectFormChanges() {
        this.changeLog = {};
        const elements = document.querySelectorAll(`input:not(disabled):not([type=hidden]):not([type=file]),
        select:not(disabled),textarea:not(disabled)`);

        for (const element of elements) {
            if (element.attributes.value && element.attributes.value.value !== element.value) {
                this.logInputChange(element);
            }
        }
    }

    showFormChanges() {
        let changes = '';

        for (const changeKey in this.changeLog) {
            if (!this.changeLog.hasOwnProperty(changeKey)) {
                continue;
            }

            const change = this.changeLog[changeKey];
            changes += `<tr hash="${changeKey}">
                                            <td>${change.time}</td>
                                            <td>input</td>
                                            <td>${change.label}</td>
                                            <td>${change.value}</td>
                                        </tr>`;
        }

        this.insertFormChanges(changes);
    }

    generateTextWithChanges() {
        let changes = '';

        for (const changeKey in this.changeLog) {
            if (!this.changeLog.hasOwnProperty(changeKey)) {
                continue;
            }

            const change = this.changeLog[changeKey];
            if (change.disabled) {
                continue;
            }

            changes += `${change.label} : ${change.value} \n`;
        }


        const formChangesPopup = document.querySelector('erp-helper-modal');
        const textarea = document.querySelector('erp-helper-modal textarea');

        if (textarea) {
            textarea.textContent = changes;
        } else {
            const rows = Object.getOwnPropertyNames(this.changeLog).length + 1;

            const html = `<textarea autofocus class="form-changes" rows="${rows}">${changes}</textarea>`;
            formChangesPopup.insertAdjacentHTML('beforeend', html);
        }

    }

    insertFormChanges(data) {
        const html = `
                            <table>
                                <thead>
                                <tr>
                                    <th>Время</th>
                                    <th>Объект</th>
                                    <th>Заголовок</th>
                                    <th>Значение</th>
                                </tr>
                                </thead>
                                ${data}
                                </tbody>
                            </table>
                            <button class="exportButton">Сгенерировать</button>`;
        Helper.renderModal(html);

        document.querySelector('erp-helper-modal table').addEventListener('click', e => {
            if (e.target.tagName === 'TD') {
                const tr = e.target.parentNode;
                tr.classList.toggle('disabled');
                const hash = tr.attributes.hash.value;
                this.changeLog[hash].disabled = !this.changeLog[hash].disabled;
            }
        });

        document.querySelector('erp-helper-modal .exportButton').addEventListener('click', e => {
            this.generateTextWithChanges();
        });
    }

    getPathTo(element) {
        if (element.id !== '') {
            return "id('" + element.id + "')";
        }
        if (element === document.body) {
            return element.tagName;
        }

        let ix = 0;
        const siblings = element.parentNode.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                return this.getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            }
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                ix++;
            }
        }
    }
}
