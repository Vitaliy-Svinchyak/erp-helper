class AlbanianFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 10000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomidNumber_al());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[fathersName]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone_al());
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
    }
}