"use strict";

class FormManager {

    constructor() {
        this.changeLog = {};
    }

    /**
     * Detects value change of element and adds it to the changeLog
     *
     * @param {HTMLInputElement|HTMLSelectElement} element - element to detect change
     * @param {boolean|undefined} disabled - if it must be disabled in result list, false by default
     */
    logInputChange(element, disabled) {
        // do not log changes of our textarea for copy
        if (element.classList.contains('form-changes')) {
            return;
        }

        disabled = disabled || false;
        const label = this.getInputLabel(element);
        const date = new Date();
        const hours = Helper.generateZerosBeforeNumber(date.getHours(), 2);
        const minutes = Helper.generateZerosBeforeNumber(date.getMinutes(), 2);
        const seconds = Helper.generateZerosBeforeNumber(date.getSeconds(), 2);
        const time = `${hours}:${minutes}:${seconds}`;
        const value = this.getInputValue(element);

        this.changeLog[this.getPathTo(element)] = {
            label: label,
            value: value,
            time: time,
            disabled: disabled
        };
    }

    /**
     * Returns formatted value of input based on its type
     *
     * @param {HTMLInputElement|HTMLSelectElement} input - the input whose value is to be obtained
     *
     * @returns {string} value or error message
     */
    getInputValue(input) {
        switch (input.tagName) {
            case 'TEXTAREA':
            case 'INPUT':
                switch (input.type) {
                    case 'checkbox':
                        return input.checked ? 'Yes' : 'No';
                    case 'radio':
                        // I saw radio buttons only inside label
                        if (input.parentNode.tagName === 'LABEL') {
                            return input.parentNode.textContent.trim();
                        }
                        return input.value;
                    default:
                        return input.value;
                }
            case 'SELECT':
                // select can be multiple
                let selectedOptions = [];
                for (const option of input.options) {
                    if (option.selected) {
                        selectedOptions.push(option.textContent.trim());
                    }
                }

                if (selectedOptions.length === 0 && input.options[0]) {
                    selectedOptions.push(input.options[0].textContent.trim());
                }

                return selectedOptions.join(' , ');

            default:
                return '<strong>WTF?! Can\'t understand!</strong>';

        }
    }

    /**
     * Detects input label based on different conditions and returns its label
     *
     * @param {HTMLInputElement|HTMLSelectElement} input - the input whose label is to be obtained
     *
     * @returns {string} - label of input or its name if label not found
     */
    getInputLabel(input) {
        let label;
        let parentContainer = input.parentNode;

        // by label binded by id
        if (input.id) {
            label = document.querySelector(`label[for="${input.id}"]`);

            if (label) {
                return label.textContent.trim();
            }
        }

        // Is satisfactorily has such nesting
        // todo can broke sth
        if (input.type === 'radio') {
            parentContainer = input.parentNode.parentNode.parentNode.parentNode;
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

        return input.name;
    }

    /**
     * @param {HTMLElement|Node} parentContainer
     *
     * @returns {string|null}
     */
    getOneLabelForTwoFields(parentContainer) {
        if (parentContainer
            && parentContainer.children
            && parentContainer.children[0].tagName === 'LABEL') {
            const content = parentContainer.children[0].textContent.trim();

            if (content) {
                return content;
            }
        }

        return null;
    }

    /**
     * @param {HTMLElement|Node} parentContainer
     *
     * @returns {string|null}
     */
    getTableStyleLabel(parentContainer) {
        if (parentContainer
            && parentContainer.children &&
            parentContainer.children[0].tagName === 'TD'
            && parentContainer.children.length
            && parentContainer.children[0].length) {

            const content = parentContainer.children[0].children[1].textContent.trim();

            if (content) {
                return content;
            }
        }

        return null;
    }

    /**
     * @param {HTMLElement|Node} parentContainer
     *
     * @returns {string|null}
     */
    getIdDocumentStyleLabel(parentContainer) {
        if (parentContainer
            && parentContainer.children
            && parentContainer.children[0].tagName === 'TD') {
            const content = parentContainer.children[0].textContent.trim();

            if (content) {
                return content;
            }
        }

        return null;
    }

    /**
     * Returns all inputs on page. But if it is page with todo_ - inputs of todo_
     *
     * @returns {Array<HTMLInputElement|HTMLSelectElement>} inputs
     */
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

    /**
     * Detects changes in inputs after auto-filling with th help of this extension
     */
    detectFormChanges() {
        this.changeLog = {};
        const elements = this.getInputElements();

        for (const element of elements) {
            if (element.attributes.value && element.attributes.value.value !== element.value) {
                this.logInputChange(element, false);
            }
        }
    }

    /**
     * Logs values of inputs which were not changed
     */
    logNotChangedFields() {
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

    /**
     * Generates html of form input values and shows them in modal window
     */
    showFormChanges() {
        this.logNotChangedFields();
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

    /**
     * Generates text representation of input values which user selects, inserts them in textarea,
     * moves focus on it and auto-copies them to the clipboard
     */
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

    /**
     * Renders modal of input values
     * @param {string} data - html of input values
     */
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

    /**
     * Generates unique(maybe not) path to element
     *
     * @param {HTMLElement|Node} element - element to which path must be generated
     *
     * @returns {string} - path
     */
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
