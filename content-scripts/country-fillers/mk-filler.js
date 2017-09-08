class MacedonianFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 2000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomidNumber_mk());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[fathersName]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone_mk());
        Helper.setValue('[name="client[documentNumber]"]', Helper.generateRandomInteger(1000, 100000));
        Helper.setValue('[name="client[language]"]', 'mk');

        MacedonianFiller.fillAddreses();
        document.querySelector('[name="service[amount][amount]"]').focus();
    }

    static fillAddreses() {
        for (let i = 0; i <= 1; i++) {
            if (document.querySelector(`[name="client[clientAddress][${i}][adrCity]"]`)) {
                const cities =
                    Array.prototype.slice.call(document.querySelector(`[name="client[clientAddress][${i}][adrCity]"]`).options, 1);
                Helper.setValueWithChangeAndFocus(
                    `[name="client[clientAddress][${i}][adrCity]"]`,
                    cities[Helper.generateRandomInteger(0, cities.length - 1)].value
                );
                setTimeout(() => {
                    const street = Helper.generateRandomName();
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
        Helper.setValue('[name="client[clientEmployers][0][title]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientEmployers][0][contactPerson]"]', Helper.generateRandomName());
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

        MacedonianFiller.fillAddreses();

        Helper.setValue('[name="client[clientContactPersons][0][name]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientContactPersons][0][surname]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientContactPersons][0][relationType]"]', 'Friend');
        Helper.setValue('[name="client[clientContactPersons][0][phone]"]', Helper.generateRandomMobilePhone_mk());
        document.querySelector('[name="client[name]"]').focus();
    }
}