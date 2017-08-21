"use strict";

class FormManager {

    constructor() {
        this.changeLog = {};
    }

    logInputChange(element) {
        const label = this.detectLabel(element);

        this.changeLog[getPathTo(element)] = {
            label: label,
            value: element.value
        };
    }

    detectLabel(element) {
        this.changeLog = {};

        let label;
        if (element.id) {
            label = document.querySelector(`label[for="${element.id}"]`);
        }

        if (label) {
            return label.textContent;
        }

        //if one label for two inputs (money fieldset)
        let parentContainer = element.parentNode;
        for (let i = 0; i <= 5; i++) {
            if (parentContainer.children[0].tagName === 'LABEL') {
                let content = parentContainer.children[0].textContent;

                if (content.trim()) {
                    return content.trim();
                }
            }
        }

        // table style (Client Credit Check)
        parentContainer = element.parentNode;
        for (let i = 0; i <= 5; i++) {

            if (parentContainer.children[0].tagName === 'TD'
                && parentContainer.children.length
                && parentContainer.children[0].length) {
                let content = parentContainer.children[0].children[1].textContent;

                if (content.trim()) {
                    return content.trim();
                }
            }

            parentContainer = parentContainer.parentNode;
        }

        // id document check style
        parentContainer = element.parentNode;
        for (let i = 0; i <= 5; i++) {

            if (parentContainer.children[0].tagName === 'TD') {
                let content = parentContainer.children[0].textContent;

                if (content.trim()) {
                    return content.trim();
                }
            }

            parentContainer = parentContainer.parentNode;
        }

        return element.name;
    }

    detectFormChanges() {
        const elements = document.querySelectorAll(`input:not(disabled):not([type=hidden]):not([type=file]),
        select:not(disabled),textarea:not(disabled)`);

        for (let element of elements) {
            if (element.attributes.value && element.attributes.value.value !== element.value) {
                this.logInputChange(element);
            }
        }
    }

    showFormChanges() {
        let changes = '';
        for (let changeKey in this.changeLog) {
            const change = this.changeLog[changeKey];
            changes += `${change.label} : ${change.value} \n`;
        }
        const html = `<background-screen>
                        <form-changes-popup>
                            <textarea autofocus class="form-changes" rows="10" cols="40">${changes}</textarea>
                        </form-changes-popup>
                    </background-screen>`;
        document.body.insertAdjacentHTML('beforeend', html);
    }
}

function getPathTo(element) {
    if (element.id !== '')
        return 'id("' + element.id + '")';
    if (element === document.body)
        return element.tagName;

    let ix = 0;
    let siblings = element.parentNode.childNodes;

    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling === element)
            return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
            ix++;
    }
}