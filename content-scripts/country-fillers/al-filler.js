"use strict";

class AlbanianFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 10000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomIdNumber_al());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName_al());
        Helper.setValue('[name="client[fathersName]"]', Helper.generateRandomName_al());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName_al());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone_al());
        Helper.setValue('[name="client[documentNumber]"]', Helper.generateRandomInteger(1000, 100000));

        const division = Helper.generateRandomName_al();
        const town = Helper.generateRandomName_al();
        const street = Helper.generateRandomName_al();
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
    }

    static fillEmployerForm() {
        Helper.setValueWithChangeAndFocus('[name="client[clientEmploymentStatus]"]', 1);
        Helper.setValue('[name="client[clientEmployers][0][dateOfEmployment]"]', Helper.generateRandomDate().substr(3));
        Helper.setValue('[name="client[clientEmployers][0][title]"]', Helper.generateRandomName_al());
        Helper.setValue('[name="client[clientEmployers][0][contactPerson]"]', Helper.generateRandomName_al());
        Helper.setValue('[name="client[clientEmployers][0][email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[clientEmployers][0][phone]"]', Helper.generateRandomHomePhone());
    }

    static fillPrimaryInfoForm() {
        Helper.setValue('[name="client[homePhone]"]', Helper.generateRandomHomePhone());
        if (document.getElementById('addressDivision').value === '') {

            const division = Helper.generateRandomName_al();
            const town = Helper.generateRandomName_al();
            const street = Helper.generateRandomName_al();
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

            Filler.fillSatisfactoryInputs(formName);
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

        //noinspection JSCheckFunctionSignatures
        observerOfSuggestions.observe(target, {attributes: true});

        Helper.setValueWithChangeAndFocus('input[name="bankName"]', bankName);
    }
}