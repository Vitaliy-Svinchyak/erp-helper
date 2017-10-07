"use strict";

class MacedonianFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 2000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomIdNumber_mk());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[fathersName]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone_mk());
        Helper.setValue('[name="client[documentNumber]"]', Helper.generateRandomInteger(1000, 100000));
        Helper.setValue('[name="client[ssn]"]', Helper.generateRandomInteger(1000, 10000000, 11));
        Helper.setValue('[name="client[language]"]', 'mk');

        MacedonianFiller.fillAddresses();
        document.querySelector('[name="service[amount][amount]"]').focus();
    }

    static fillAddresses() {
        for (let i = 0; i <= 1; i++) {
            if (document.querySelector(`[name="client[clientAddress][${i}][adrCity]"]`)) {
                const cities =
                    Array.prototype.slice.call(document.querySelector(`[name="client[clientAddress][${i}][adrCity]"]`).options, 1);

                if (!cities.length) {
                    continue;
                }

                Helper.setValueWithChangeAndFocus(
                    `[name="client[clientAddress][${i}][adrCity]"]`,
                    cities[Helper.generateRandomInteger(0, cities.length - 1)].value
                );
                setTimeout(() => {
                    const street = Helper.generateRandomName_mk();
                    const house = Helper.generateRandomInteger(1, 999);
                    const apartment = Helper.generateRandomInteger(1, 999);
                    const currentId = document.querySelector(`[name="client[clientAddress][${i}][adrId][id]`).value.split('|');
                    const currentValue = document.querySelector(`[name="client[clientAddress][${i}][adrId][text]`).value.split('|');

                    const valuesText = currentValue[0] + `|${street}|${house}|${apartment}|` + currentValue[1];
                    const idText = currentId[0] + '|-1|-1|-1|' + currentId[1];

                    Helper.setValue(`[name="client[clientAddress][${i}][adrStreet]"]`, street).removeAttribute('disabled');
                    Helper.setValue(`[name="client[clientAddress][${i}][adrHouse]"]`, house).removeAttribute('disabled');
                    Helper.setValue(`[name="client[clientAddress][${i}][adrApartment]"]`, apartment).removeAttribute('disabled');

                    Helper.setValue(`[name="client[clientAddress][${i}][adrId][id]"]`, idText);
                    Helper.setValue(`[name="client[clientAddress][${i}][adrId][text]"]`, valuesText)
                }, 100);
            }
        }
    }

    static fillEmployerForm() {
        Helper.setValueWithChangeAndFocus('[name="client[clientEmploymentStatus]"]', 1);
        Helper.setValueWithChangeAndFocus('[name="client[clientEmployers][0][dateOfEmployment]"]', Helper.generateRandomDate().substr(3));
        Helper.setValue('[name="client[clientEmployers][0][title]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[clientEmployers][0][contactPerson]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[clientEmployers][0][email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[clientEmployers][0][phone]"]', Helper.generateRandomMobilePhone_mk());
        Helper.setValue('[name="client[clientEmployers][0][salaryPerCycle][amount]"]', Helper.generateRandomInteger(5000, 10000));
        Helper.setValue('[name="client[additionalIncome][amount]"]', Helper.generateRandomInteger(500, 1000));

        const incomeTypes =
            Array.prototype.slice.call(document.querySelector('[name="client[additionalIncome][type]"]').options);

        Helper.setValue('[name="client[additionalIncome][type]"]', incomeTypes[Helper.generateRandomInteger(0, incomeTypes.length - 1)].value);
    }

    static fillPrimaryInfoForm() {
        Helper.setValue('[name="client[homePhone]"]', Helper.generateRandomMobilePhone_mk());

        MacedonianFiller.fillAddresses();

        Helper.setValue('[name="client[clientContactPersons][0][name]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[clientContactPersons][0][surname]"]', Helper.generateRandomName_mk());
        Helper.setValue('[name="client[clientContactPersons][0][relationType]"]', 'Friend');
        Helper.setValue('[name="client[clientContactPersons][0][phone]"]', Helper.generateRandomMobilePhone_mk());
        Helper.setValue('[name="client[payDate][dateOfMonth]"]', Helper.generateRandomInteger(1, 25));
        document.querySelector('[name="client[name]"]').focus();
    }

    static fillIdDocumentForm() {
        const formName = 'client_id_document_form';
        const inputsToFill = Filler.getInputsToFill(formName);

        for (const input of inputsToFill) {
            switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
                case'[documentType]':
                    input.value = 'passport';
                    break;
                case'[documentNumber]':
                    input.value = 'C' + Helper.generateRandomInteger(1000000, 9999999);
                    break;
                case'[expiryDate]':
                    Helper.setValueWithChangeAndFocus(input, Helper.generateRandomDate(true));
                    break;
                case'[documentIssueDate]':
                    input.value = Helper.generateRandomDate(false);
                    break;
                case '[EMBGMatches]':
                case '[nameMatchesSurname]':
                case '[declaredAddressMatches]':
                    if (input.value === '1') {
                        Helper.clickElement(input);
                    }
                    break;
                default:
                    break;
            }
        }

        Filler.fillSatisfactoryInputs(formName);
    }

    static fillBankAccountForm() {
        const formName = 'client_bank_account_confirmation_form';
        const inputsToFill = Filler.getInputsToFill(formName);

        for (let addNew of document.querySelectorAll('[data-field="bankAccount"] td div a')) {
            Helper.clickElement(addNew);
        }

        for (const input of inputsToFill) {
            switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
                case '[bankName]':
                    Filler.onTodoBodyChange(function() {
                        document.querySelector('tr[data-field="bankName"] .tt-menu .tt-suggestion').click();
                        Filler.fillSatisfactoryInputs(formName);
                    });
                    Helper.setValueWithChangeAndFocus(input, '');
                    break;
                case '[bankAccount]':
                    input.value = 'MK33100' + Helper.generateRandomInteger(100000000000, 999999999999);
                    break;
                case '[isPrimary]':
                case '[documentCopied]':
                    if (input.value === '1') {
                        Helper.clickElement(input);
                    }
                    break;
                default:
                    break;
            }
        }

        Filler.fillSatisfactoryInputs(formName);
    }

    static fillBankStatementForm() {
        const formName = 'client_bank_statements_form';
        const inputsToFill = Filler.getInputsToFill(formName);

        for (const input of inputsToFill) {
            switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
                case '[bankName]':
                    Filler.onTodoBodyChange(function() {
                        document.querySelector('tr[data-field="bankName"] .tt-menu .tt-suggestion').click();
                        Filler.fillSatisfactoryInputs(formName);
                    });
                    Helper.setValueWithChangeAndFocus(input, '');
                    break;
                case '[accountNumber]':
                    input.value = 'MK33100' + Helper.generateRandomInteger(100000000000, 999999999999);
                    break;
                case '[isNameTheSameInApplication]':
                case '[isAddressTheSameInApplication]':
                case '[isClientIdTheSameInApplication]':
                case '[isBankLogoOrStampPresent]':
                case '[isMonthlyIncomeMoreThanXMKD]':
                case '[isIncomeFromLegalEntity]':
                case '[isTransactionsNotSuspicious]':
                    if (input.value === '1') {
                        Helper.clickElement(input);
                    }
                    break;
                default:
                    break;
            }
        }

        Filler.fillSatisfactoryInputs(formName);
    }
}