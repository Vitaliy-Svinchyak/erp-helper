"use strict";

class FormManager {

    constructor() {
        this.changeLog = {};
    }

    logInputChange(element) {
        const label = this.detectLabel(element);

        this.changeLog[this.getPathTo(element)] = {
            label: label,
            value: element.value
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
        let maxStringLength = 0;

        for (const changeKey in this.changeLog) {
            const change = this.changeLog[changeKey];
            const changeStringified = `${change.label} : ${change.value} \n`;
            if (maxStringLength < changeStringified.length) {
                maxStringLength = changeStringified.length;
            }
            changes += changeStringified;
        }

        const rows = Object.getOwnPropertyNames(this.changeLog).length + 1;
        const cols = maxStringLength;

        const html = `<background-screen>
                        <form-changes-popup>
                            <textarea autofocus class="form-changes" rows="${rows}" cols="${cols}">${changes}</textarea>
                        </form-changes-popup>
                    </background-screen>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    getPathTo(element) {
        if (element.id !== '')
            return 'id("' + element.id + '")';
        if (element === document.body)
            return element.tagName;

        let ix = 0;
        const siblings = element.parentNode.childNodes;

        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element)
                return this.getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
                ix++;
        }
    }
}
