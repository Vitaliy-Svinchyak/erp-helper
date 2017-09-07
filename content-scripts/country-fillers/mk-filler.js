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

        const genders = ['m', 'f'];
        Helper.setValue('[name="client[gender]"]', genders[Helper.generateRandomInteger(0, 1)]);
        Helper.setValue('[name="client[birthday]"]', Helper.generateRandomBithday());

        const sources =
            Array.prototype.slice.call(document.querySelector('[name="client[informationSource]"]').options, 1);
        Helper.setValue('[name="client[informationSource]"]', sources[Helper.generateRandomInteger(0, sources.length - 1)].value);
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

        for (let i = 0; i <= 1; i++) {
            if (document.querySelector(`[name="client[clientAddress][${i}][adrCity]"]`).value === '') {
                const town = Helper.generateRandomName();
                const street = Helper.generateRandomName();
                const house = Helper.generateRandomInteger(1, 999);
                const apartment = Helper.generateRandomInteger(1, 999);
                const postalCode = Helper.generateRandomInteger(1, 999);

                const valuesText = document.querySelector(`[name="client[clientAddress][${i}][adrId][text]"]`).value
                    + `|${town}|${street}|${house}|${apartment}|${postalCode}|`;
                const idText = document.querySelector(`[name="client[clientAddress][${i}][adrId][id]"]`).value + `|-1|-1|-1|-1|-1`;

                Helper.setValue(`[name="client[clientAddress][${i}][adrCity]"]`, town).removeAttribute(`disabled`);
                Helper.setValue(`[name="client[clientAddress][${i}][adrStreet]"]`, street).removeAttribute(`disabled`);
                Helper.setValue(`[name="client[clientAddress][${i}][adrHouse]"]`, house).removeAttribute(`disabled`);
                Helper.setValue(`[name="client[clientAddress][${i}][adrApartment]"]`, apartment).removeAttribute(`disabled`);
                Helper.setValue(`[name="client[clientAddress][${i}][adrPostcode]"]`, postalCode).removeAttribute(`disabled`);

                Helper.setValue(`[name="client[clientAddress][${i}][adrId][id]"]`, idText);
                Helper.setValue(`[name="client[clientAddress][${i}][adrId][text]"]`, valuesText);
            }
        }

        Helper.setValue('[name="client[clientContactPersons][0][name]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientContactPersons][0][surname]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[clientContactPersons][0][relationType]"]', 'Friend');
        Helper.setValue('[name="client[clientContactPersons][0][phone]"]', Helper.generateRandomMobilePhone_mk());
    }
}