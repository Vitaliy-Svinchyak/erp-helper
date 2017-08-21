"use strict";

class Filler {

    static fillCmsApplication() {
        Helper.setValueWithChangeAndFocus('[name="identificationNumber"]', Helper.getRandomMap());
        Helper.setValueWithChangeAndFocus('[name="name"]', Helper.generateRandomName());
        Helper.setValueWithChangeAndFocus('[name="fathersName"]', Helper.generateRandomName());
        Helper.setValueWithChangeAndFocus('[name="surname"]', Helper.generateRandomName());
        Helper.setValueWithChangeAndFocus('[name="email"]', Helper.generateRandomEmail());
        Helper.setValueWithChangeAndFocus('[name="phone"]', Helper.generateRandomMobilePhone());

        const division = Helper.generateRandomName();
        const town = Helper.generateRandomName();
        const street = Helper.generateRandomName();
        const house = Helper.generateRandomInteger(1, 999);
        const entrance = Helper.generateRandomInteger(1, 999);
        const apartment = Helper.generateRandomInteger(1, 999);
        const postalCode = Helper.generateRandomInteger(1111, 9999);

        if (document.querySelector('[name="address[adrDistrict]"]')) {
            const districts = document.querySelector('[name="address[adrDistrict]"]').children;
            const selectedDistrictNumber = Helper.generateRandomInteger(0, districts.length - 1);
            const district = districts[selectedDistrictNumber].value;

            const valuesText = `${district}|${division}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
            const idText = `${district}|-1|-1|-1|-1|-1|-1|-1`;

            Helper.setValue('[name="address[adrId][id]"]', idText);
            Helper.setValue('[name="address[adrId][text]"]', valuesText);

            Helper.setValue('[name="address[adrDistrict]"]', district);
            Helper.setValueWithChangeAndFocus('[name="address[adrDivision]"]', division);
            Helper.setValueWithChangeAndFocus('[name="address[adrCity]"]', town);
            Helper.setValueWithChangeAndFocus('[name="address[adrStreet]"]', street);
            Helper.setValueWithChangeAndFocus('[name="address[adrHouse]"]', house);
            Helper.setValueWithChangeAndFocus('[name="address[adrEntrance]"]', entrance);
            Helper.setValueWithChangeAndFocus('[name="address[adrApartment]"]', apartment);
            Helper.setValueWithChangeAndFocus('[name="address[adrPostcode]"]', postalCode);

            const password = Helper.generateRandomName(8, true) + Helper.generateRandomInteger(0, 9);
            Helper.setValueWithChangeAndFocus('[name="password"]', password);
            Helper.setValueWithChangeAndFocus('[name="passwordVerification"]', password);
            document.querySelector('[name="password"]').type = 'text';
            document.querySelector('[name="passwordVerification"]').type = 'text';
        }

        if (!document.querySelector('[name="acceptTerms').checked) {
            document.querySelector('[name="acceptTerms').click();
        }

        const port = chrome.extension.connect();
        port.postMessage(
            {
                'class': 'application',
                'method': 'onFilled',
                'data': {'type': 'web'}
            }
        );
        port.disconnect();
    }

    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 10000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomMap());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[fathersName]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone());
        Helper.setValue('[name="client[documentNumber]"]', Helper.generateRandomInteger(1000, 100000));

        const division = Helper.generateRandomName();
        const town = Helper.generateRandomName();
        const street = Helper.generateRandomName();
        const house = Helper.generateRandomInteger(1, 999);
        const entrance = Helper.generateRandomInteger(1, 999);
        const apartment = Helper.generateRandomInteger(1, 999);
        const postalCode = Helper.generateRandomInteger(1, 999);

        const valuesText = document.querySelector('[name="client[adrId][text]').value
            + `|${division}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
        const idText = document.querySelector('[name="client[adrId][id]"]').value + '|-1|-1|-1|-1|-1|-1|-1';

        Helper.setValue('[name="client[adrId][id]"]', idText);
        Helper.setValue('[name="client[adrId][text]', valuesText);
        Helper.setValue('[name="client[adrDivision]"]', division);
        Helper.setValue('[name="client[adrCity]"]', town);
        Helper.setValue('[name="client[adrStreet]"]', street);
        Helper.setValue('[name="client[adrHouse]"]', house);
        Helper.setValue('[name="client[adrEntrance]"]', entrance);
        Helper.setValue('[name="client[adrApartment]"]', apartment);
        Helper.setValue('[name="client[adrPostcode]"]', postalCode);

        document.querySelector('[name="client[adrCity]"]').removeAttribute('disabled');
        document.querySelector('[name="client[adrStreet]"]').removeAttribute('disabled');
        document.querySelector('[name="client[adrHouse]"]').removeAttribute('disabled');
        document.querySelector('[name="client[adrEntrance]"]').removeAttribute('disabled');
        document.querySelector('[name="client[adrApartment]"]').removeAttribute('disabled');
        document.querySelector('[name="client[adrPostcode]"]').removeAttribute('disabled');

        document.querySelector('[name="service[amount][amount]"').focus();

        const port = chrome.extension.connect();
        port.postMessage(
            {
                'class': 'application',
                'method': 'onFilled',
                'data': {'type': 'erp'}
            }
        );
        port.disconnect();
    }

    static getInputsToFill(formName) {
        return document
            .querySelectorAll(`form[name="${formName}"] fieldset:not([disabled]) input:not([disabled]):not([type=hidden]):not([type=file]):not([readonly]),form[name="${formName}"]  fieldset:not([disabled]) select:not([disabled])`);
    }

    static getSatisfactoryInputs(formName) {
        return document
            .querySelectorAll(`form[name="${formName}"] fieldset:not([disabled]) input[type="radio"]:not([disabled])`);
    }

    static onTodoBodyChange(callback) {
        const target = document.querySelector('.todo_col2');

        Filler.observerOfTodoBody = new MutationObserver((mutations) => {
            mutations.filter(m => m.addedNodes.length)
                .forEach(() => {
                    callback();
                    Filler.observerOfTodoBody.disconnect();
                });
        });

        Filler.observerOfTodoBody.observe(target, {childList: true, subtree: true});
    }

    static fillSatisfatoryInputs(formName) {
        for (const satisfactory of Filler.getSatisfactoryInputs(formName)) {

            if (satisfactory.name.match(/\[[a-zA-Z]*]/)[0] === '[isSatisfactorily]' && satisfactory.value === '1') {
                satisfactory.click();
            }
        }
    }

    static fillCreditDbUpdateTodo() {
        const form = document.querySelector('form[name="creditdb_request_form"]');
        const inputName = form.elements[0].elements[0].name;
        const id = inputName.match(/[\d]+/)[0];
        const selectorStart = `[name="md[${id}][`;

        const unlockManual = document.querySelector(`${selectorStart}unlockForManual]"]`);

        if (!unlockManual.checked) {
            unlockManual.click();
        }

        if (!unlockManual.checked) {
            return false;
        }

        Helper.setValue(`${selectorStart}debtAmount]"]`, 1);
        Helper.setValue(`${selectorStart}debtCount]"]`, 1);
        Helper.setValue(`${selectorStart}loanAmount]"]`, 1);
        Helper.setValue(`${selectorStart}loanCount]"]`, 1);
        Helper.setValue(`${selectorStart}loanMonthlyAmount]"]`, 1);
        Helper.setValue(`${selectorStart}worstStatus]"]`, 1);
        Helper.setValue(`${selectorStart}debtAmountRelated]"]`, 1);
        Helper.setValue(`${selectorStart}debtCountRelated]"]`, 1);
        Helper.setValue(`${selectorStart}loanAmountRelated]"]`, 1);
        Helper.setValue(`${selectorStart}loanCountRelated]"]`, 1);
        Helper.setValue(`${selectorStart}loanMonthlyAmountRelated]"]`, 1);
        Helper.setValue(`${selectorStart}worstStatusRelated]"]`, 1);
        Helper.setValue(`${selectorStart}lastInquiryDate]"]`, Helper.generateRandomDate());
    }

    static fillIdDocumentForm() {
        const addDocumentButton = document.querySelector('#add-id-document');
        const formName = 'client_id_document_form';
        let inputsToFill = Filler.getInputsToFill(formName);

        const insertData = () => {
            inputsToFill = Filler.getInputsToFill(formName);

            for (const input of inputsToFill) {
                switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
                    case'[documentType]':
                        input.value = 'passport';
                        break;
                    case'[documentNumber]':
                        input.value = Helper.generateRandomInteger(1000, 99999);
                        break;
                    case'[expiryDate]':
                        input.value = Helper.generateRandomDate(true);
                        break;
                    case'[isPhoneNumberCallable]':
                        if (input.value === '1') {
                            Helper.clickElement(input);
                        }
                        break;
                    default:
                        break;
                }
            }

            Filler.fillSatisfatoryInputs(formName);
        };


        if (inputsToFill.length === 0 && addDocumentButton) {
            Filler.onTodoBodyChange(insertData);
            Helper.clickElement(addDocumentButton);

            return true;
        } else if (inputsToFill.length === 0) {
            return false;
        }

        insertData();
    }

    static fillHouseholdBillForm() {
        const addDocumentButton = document.querySelector('#add-household-bill');
        const billTypes = ['electricity', 'home_phone', 'other'];
        const formName = 'client_household_bill_form';

        let inputsToFill = Filler.getInputsToFill(formName);

        const insertData = () => {
            inputsToFill = Filler.getInputsToFill(formName);

            for (const input of inputsToFill) {
                switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
                    case'[billType]':
                        input.value = billTypes[Math.floor(Math.random() * billTypes.length)];
                        break;
                    case'[billPeriodStart]':
                        input.value = Helper.generateRandomDate();
                        break;
                    case'[billPeriodEnd]':
                        input.value = Helper.generateRandomDate(true);
                        break;
                    case'[isAddressTheSameInApplication]':
                        if (input.value === '1') {
                            input.click();
                        }
                        break;
                    default:
                        break;
                }
            }

            Filler.fillSatisfatoryInputs(formName);
        };

        if (inputsToFill.length === 0 && addDocumentButton) {
            Filler.onTodoBodyChange(insertData);
            addDocumentButton.click();

            return true;
        } else if (inputsToFill.length === 0) {
            return false;
        }

        insertData();
    }

    static fillPayrollOrIrsForm() {
        const addDocumentButton = document.querySelector('#add-payroll-or-irs');
        const formName = 'client_payroll_or_irs_form';

        let inputsToFill = Filler.getInputsToFill(formName);

        const insertData = () => {
            inputsToFill = Filler.getInputsToFill(formName);
            for (const input of inputsToFill) {
                switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
                    case'[occupation]':
                    case'[employerName]':
                        input.value = Helper.generateRandomName();
                        break;
                    case'[additionalIncome]':
                        if (input.type === 'number') {
                            input.value = Helper.generateRandomInteger(300, 3000);
                        } else {
                            const additionalIncomTypes = input.children;
                            let randomKey = Math.floor(Math.random() * additionalIncomTypes.length);

                            if (randomKey === 0) {
                                randomKey++;
                            }

                            input.value = additionalIncomTypes[randomKey].value;
                        }
                        break;
                    case'[income]':
                        if (input.classList.contains('money_amount_inp')) {
                            input.value = 10000000;
                        }
                        break;
                    default:
                        break;
                }
            }
            Helper.setValueWithChangeAndFocus(inputsToFill[3], inputsToFill[3].value);
            Filler.fillSatisfatoryInputs(formName);
        };

        if (inputsToFill.length === 0 && addDocumentButton) {
            Filler.onTodoBodyChange(insertData);
            addDocumentButton.click();

            return true;
        } else if (inputsToFill.length === 0) {
            return false;
        }

        insertData();
    }

    static fillPrimaryInfoForm() {
        Helper.setValue('[name="client[homePhone]"]', Helper.generateRandomHomePhone());
        if (document.getElementById('addressDivision').value === '') {

            const division = Helper.generateRandomName();
            const town = Helper.generateRandomName();
            const street = Helper.generateRandomName();
            const house = Helper.generateRandomInteger(1, 999);
            const entrance = Helper.generateRandomInteger(1, 999);
            const apartment = Helper.generateRandomInteger(1, 999);
            const postalCode = Helper.generateRandomInteger(1, 999);

            const valuesText = document.querySelector('[data-addr="fullAddress"]').value
                + `|${division}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
            const idText = document.querySelector('[data-addr="adrId"]').value + '|-1|-1|-1|-1|-1|-1|-1';

            Helper.setValue('#addressDivision', division);
            Helper.setValue('#addressCity', town);
            Helper.setValue('#addressStreet', street);
            Helper.setValue('#addressHouse', house);
            Helper.setValue('#addressEntrance', entrance);
            Helper.setValue('#addressApartment', apartment);
            Helper.setValue('#addressPostCode', postalCode);

            document.querySelector('#addressDivision').removeAttribute('disabled');
            document.querySelector('#addressCity').removeAttribute('disabled');
            document.querySelector('#addressStreet').removeAttribute('disabled');
            document.querySelector('#addressHouse').removeAttribute('disabled');
            document.querySelector('#addressEntrance').removeAttribute('disabled');
            document.querySelector('#addressApartment').removeAttribute('disabled');
            document.querySelector('#addressPostCode').removeAttribute('disabled');

            Helper.setValue('[data-addr="adrId"]', idText);
            Helper.setValue('[data-addr="fullAddress"]', valuesText);
        }
    }

    static fillEmployerForm() {
        Helper.setValueWithChangeAndFocus('[name="client[clientEmploymentStatus]"]', 1);
        Helper.setValue('[name="client[clientEmployers][0][dateOfEmployment]"]', Helper.generateRandomDate().substr(3));
        Helper.setValue('[name="client[clientEmployers][0][title]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientEmployers][0][contactPerson]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientEmployers][0][email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[clientEmployers][0][phone]"]', Helper.generateRandomHomePhone());
    }

    static fillBankAccountForm() {
        Helper.clickElement('input[name="isPrimary"][value="1"]');
        const select = document.querySelector('select[name="bankAccount"]');
        const options = select.children;
        let bankName;

        for (const option of options) {
            if (option.nodeName !== 'OPTGROUP') {
                continue;
            }

            bankName = option.label;
            select.value = option.children[0].value;
            break;
        }

        const target = document.querySelector('.tt-menu');

        const observerOfSuggestions = new MutationObserver((mutations) => {
            mutations
                .filter(mutation => mutation.attributeName === 'class')
                .forEach(() => {
                    for (const variant of document.querySelectorAll('.tt-suggestion.tt-selectable')) {
                        if (variant.textContent === bankName) {
                            variant.click();
                            observerOfSuggestions.disconnect();
                            observerOfSuggestions.disconnect()
                        }
                    }
                });
        });

        observerOfSuggestions.observe(target, {attributes: true});

        Helper.setValueWithChangeAndFocus('input[name="bankName"]', bankName);
    }

    static fillPayment() {
        const receipients = document.querySelector('#recipientBankClassificator').children;
        const selectedReceipientNumber = Helper.generateRandomInteger(0, receipients.length - 1);
        const receipient = receipients[selectedReceipientNumber].value;
        Helper.setValueWithChangeAndFocus('#recipientBankClassificator', receipient);

        const methods = document.querySelector('#paymentMethod').children;
        const selectedMethodNumber = Helper.generateRandomInteger(1, methods.length);
        const method = methods[selectedMethodNumber].value;
        console.log(selectedMethodNumber);
        Helper.setValue('#paymentMethod', method);
        Helper.setValue('#amount_inp', 10000);
    }

    static assignPayment() {
        const xpath = '//td[text()="Payment info"]';
        const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const invoiceNumber = matchingElement.parentNode.children[1].textContent;
        Helper.setValue('#manual_assign_object_text', invoiceNumber);
        Helper.setValue('#comment_inp', invoiceNumber);

        const target = document.querySelector('#erpPopup');

        Filler.observerOfPopup = new MutationObserver((mutations) => {
            mutations.filter(m => m.addedNodes.length)
                .forEach((a) => {
                    document.querySelector('#erpPopup iframe').addEventListener('load', () => {
                        document.querySelector('#erpPopup iframe').contentDocument.querySelector('#assignment_btn').click();
                    });
                    Filler.observerOfPopup.disconnect();
                });
        });

        Filler.observerOfPopup.observe(target, {childList: true, subtree: true});

        Helper.clickElement('#manual_assign_btn');
    }

    static fillClientRegistration() {
        Filler.fillCmsApplication();
        Helper.setValue('[data-addr="fullAddress"]', document.querySelector('[name="address[adrId][text]"]').value);
        const currentId = document.querySelector('[name="address[adrId][id]"]').value.split('|');
        currentId[0] = 10000;
        Helper.setValue('[name="address[adrId][id]"]', currentId.join('|'));
    }

    static fillConfirmCheckForm() {
        const xpath = '//b[text()="View Document"]';
        const matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (!matchingElement) {
            Helper.clickElement('#btnCreateDocument');
            setTimeout(() => {
                Helper.clickElement('.bootbox-confirm .btn.btn-primary');
            }, 150);
        } else {
            const xpathRadio = '//label[text()="Yes"]';
            const isSatisfactorily = document.evaluate(xpathRadio, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            if (isSatisfactorily) {
                isSatisfactorily.firstChild.click();
                Helper.clickElement('.js-save-client-document');
            }
        }
    }
}