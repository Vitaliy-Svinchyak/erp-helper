"use strict";

class Filler {

    static executeFillerFunction(name) {
        switch (window.location.origin.substr(-2, 2)) {
            case 'mk':
                MacedonianFiller[name]();
                break;
            case 'al':
                AlbanianFiller[name]();
                break;
        }
    }

    static fillCmsApplication() {
        Helper.setValueWithChangeAndFocus('[name="identificationNumber"]', Helper.getRandomIdNumber_al());
        Helper.setValueWithChangeAndFocus('[name="name"]', Helper.generateRandomName_al());
        Helper.setValueWithChangeAndFocus('[name="fathersName"]', Helper.generateRandomName_al());
        Helper.setValueWithChangeAndFocus('[name="surname"]', Helper.generateRandomName_al());
        Helper.setValueWithChangeAndFocus('[name="email"]', Helper.generateRandomEmail());
        Helper.setValueWithChangeAndFocus('[name="phone"]', Helper.generateRandomMobilePhone_al());
        Helper.setValueWithChangeAndFocus('[name="monthlyIncome"]', Helper.generateRandomInteger(250000, 500000));

        const division = Helper.generateRandomName_al();
        const town = Helper.generateRandomName_al();
        const street = Helper.generateRandomName_al();
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
        }

        if (document.querySelector('[name="password"]')) {
            const password = '123123eeE';
            Helper.setValueWithChangeAndFocus('[name="password"]', password);
            Helper.setValueWithChangeAndFocus('[name="passwordVerification"]', password);
            document.querySelector('[name="password"]').type = 'text';
            document.querySelector('[name="passwordVerification"]').type = 'text';
        }

        if (!document.querySelector('[name="acceptTerms').checked) {
            document.querySelector('[name="acceptTerms').click();
        }
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

        //noinspection JSCheckFunctionSignatures
        Filler.observerOfTodoBody.observe(target, {childList: true, subtree: true});
    }

    static fillSatisfactoryInputs(formName) {
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

            Filler.fillSatisfactoryInputs(formName);
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
                        input.value = Helper.generateRandomName_al();
                        break;
                    case'[additionalIncome]':
                        if (input.type === 'number') {
                            input.value = Helper.generateRandomInteger(300, 3000);
                        } else {
                            const additionalIncomeTypes = input.children;
                            let randomKey = Math.floor(Math.random() * additionalIncomeTypes.length);

                            if (randomKey === 0) {
                                randomKey++;
                            }

                            input.value = additionalIncomeTypes[randomKey].value;
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
            Filler.fillSatisfactoryInputs(formName);
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

    static fillPayment() {
        const receipients = document.querySelector('#recipientBankClassificator').children;
        const selectedReceipientNumber = Helper.generateRandomInteger(0, receipients.length - 1);
        const receipient = receipients[selectedReceipientNumber].value;
        Helper.setValueWithChangeAndFocus('#recipientBankClassificator', receipient);

        const methods = document.querySelector('#paymentMethod').children;
        const selectedMethodNumber = Helper.generateRandomInteger(1, methods.length);
        const method = methods[selectedMethodNumber].value;
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
                .forEach(() => {
                    document.querySelector('#erpPopup iframe').addEventListener('load', () => {
                        document.querySelector('#erpPopup iframe').contentDocument.querySelector('#assignment_btn').click();
                    });
                    Filler.observerOfPopup.disconnect();
                });
        });

        //noinspection JSCheckFunctionSignatures
        Filler.observerOfPopup.observe(target, {childList: true, subtree: true});

        Helper.clickElement('#manual_assign_btn');
    }

    static fillClientRegistration() {
        Filler.fillCmsApplication();
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