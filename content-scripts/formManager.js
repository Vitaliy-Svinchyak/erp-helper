"use strict";
/** @var Helper Helper **/
class FormManager {

    constructor() {

        this.changeLog = {};
    }

    logInputChange(element, disabled) {
        // do not log changes of our textarea for copy
        if (element.classList.contains('form-changes')) {
            return;
        }

        disabled = disabled || false;
        const label = this.detectLabel(element);
        const date = new Date();
        const hours = Helper.generateZerosBeforeNumber(date.getHours(), 2);
        const minutes = Helper.generateZerosBeforeNumber(date.getMinutes(), 2);
        const seconds = Helper.generateZerosBeforeNumber(date.getSeconds(), 2);
        const time = `${hours}:${minutes}:${seconds}`;
        const value = this.getElementValue(element);

        this.changeLog[this.getPathTo(element)] = {
            label: label,
            value: value,
            time: time,
            disabled: disabled
        };
    }

    getElementValue(element) {
        switch (element.tagName) {
            case 'TEXTAREA':
            case 'INPUT':
                switch (element.type) {
                    case 'checkbox':
                        return element.checked ? 'Yes' : 'No';
                    case 'radio':
                        // I saw radio buttons only inside label
                        if (element.parentNode.tagName === 'LABEL') {
                            return element.parentNode.textContent.trim();
                        }
                        return element.value;
                    default:
                        return element.value;
                }
            case 'SELECT':
                // select can be multiple
                let selectedOptions = [];
                for (const option of element.options) {
                    if (option.selected) {
                        selectedOptions.push(option.textContent.trim());
                    }
                }

                if (selectedOptions.length === 0 && element.options[0]) {
                    selectedOptions.push(element.options[0].textContent.trim());
                }

                return selectedOptions.join(' , ');

            default:
                return '<strong>WTF?! Can\'t understand!</strong>';

        }
    }

    detectLabel(element) {
        let label;
        let parentContainer = element.parentNode;

        // by label binded by id
        if (element.id) {
            label = document.querySelector(`label[for="${element.id}"]`);

            if (label) {
                return label.textContent.trim();
            }
        }

        // Is satisfactorily has such nesting
        // todo can broke sth
        if (element.type === 'radio') {
            parentContainer = element.parentNode.parentNode.parentNode.parentNode;
        }

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

    getInputElements() {
        let addionalQuery = '';
        // if it is page with todos - select only inputs inside it
        if (document.querySelector('.todo_col2')) {
            addionalQuery = '.todo_col2';
        }

        // no disabled, hidden, and file inputs
        let elements = Array.prototype.slice.call(
            document.querySelectorAll(`${addionalQuery} input:not(disabled):not([type=hidden]):not([type=file]),
                ${addionalQuery} select:not(disabled),${addionalQuery} textarea:not(disabled)`)
        );

        elements = elements.filter(element => {
            // only 1 radio for name - which is selected
            if (element.type === 'radio') {
                return element.checked;
            }

            // no empty values
            if (~['text', 'number', 'email'].indexOf(element.type)) {
                return element.value !== '';
            }

            // no empty selects
            if (element.tagName === 'SELECT') {
                return element.options.length;
            }

            return true;
        });

        return elements;
    }

    detectFormChanges() {
        this.changeLog = {};
        const elements = this.getInputElements();

        for (const element of elements) {
            if (element.attributes.value && element.attributes.value.value !== element.value) {
                this.logInputChange(element, false);
            }
        }
    }

    detectNotChangedFields() {
        const elements = this.getInputElements();

        for (const element of elements) {
            const hash = this.getPathTo(element);

            if (!this.changeLog.hasOwnProperty(hash)) {
                this.logInputChange(element, true);
            } else {
                // some inputs (for example - bootstrap selectpickers) doesn't fire "change" event,
                // so it will not be detected by global "change" listener
                const propertyIsDisabled = this.changeLog[hash].disabled;
                if (propertyIsDisabled) {
                    this.logInputChange(element, true);
                }
            }
        }
    }

    showFormChanges() {
        this.detectNotChangedFields();
        let changes = '';

        for (const changeKey in this.changeLog) {
            if (!this.changeLog.hasOwnProperty(changeKey)) {
                continue;
            }

            const change = this.changeLog[changeKey];
            const disabledClass = change.disabled ? 'class="disabled"' : '';
            changes += `<tr ${disabledClass} hash="${changeKey}">
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
        let rows = 1;

        for (const changeKey in this.changeLog) {
            if (!this.changeLog.hasOwnProperty(changeKey)) {
                continue;
            }

            const change = this.changeLog[changeKey];
            if (change.disabled) {
                continue;
            }

            rows++;
            changes += `${change.label} : ${change.value} \n`;
        }


        const formChangesPopup = document.querySelector('erp-helper-modal');
        let textarea = document.querySelector('erp-helper-modal textarea');

        if (textarea) {
            textarea.textContent = changes;
            textarea.attributes.rows.value = rows;
            textarea.focus();
        } else {
            const html = `<textarea autofocus class="form-changes" rows="${rows}">${changes}</textarea>`;
            formChangesPopup.insertAdjacentHTML('beforeend', html);
            textarea = document.querySelector('erp-helper-modal textarea');
        }

        textarea.select();

        try {
            setTimeout(() => {
                const result = document.execCommand('copy');

                if (result) {
                    document.querySelector('erp-helper-modal .exportButton').textContent = 'Скопировано в буфер обмена!';
                    setTimeout(() => {
                        document.querySelector('erp-helper-modal .exportButton').textContent = 'Сгенерировать';
                    }, 2000);
                }
            }, 100);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

    }

    insertFormChanges(data) {
        const html = `<table>
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

        document.querySelector('erp-helper-modal .exportButton').addEventListener('click', () => {
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
