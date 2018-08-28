"use strict";

class ZambiaFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 2000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomIdNumber_zm());
        Helper.setValue('[name="clientIdDocument[documentNumber]"]', Helper.getRandomIdNumber_zm());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="client[middleName]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="client[birthday]"]', Helper.generateRandomBirthday());
        Helper.setValue('[name="clientIdDocument[expiryDate]"]', Helper.generateRandomExpiryDate());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone_zm());
        Helper.setValueWithChangeAndFocus('[name="client[gender]"]', Helper.generateRandomGender());
        Helper.setValueWithChangeAndFocus('[name="client[clientTpin]"]', Helper.generateRandomInteger(1000000000,9999999999,10));
        Helper.setValueWithChangeAndFocus('[name="clientIdDocument[documentType]"]', 'passport');
        Helper.setValueWithChangeAndFocus('[name="clientIdDocument[countryOfIssue]"]', 'zambia');

        ZambiaFiller.fillAddresses();
        ZambiaFiller.fillAppEmployerForm();
        ZambiaFiller.fillAppContactPerson();
        document.querySelector('[name="service[amount][amount]"]').focus();
    }

    static fillAddresses() {
        const city = Helper.generateRandomName_en();
        const cityArea = Helper.generateRandomName_en();
        const street = Helper.generateRandomName_en();
        const house = Helper.generateRandomInteger(1, 999);
        const poBox = Helper.generateRandomInteger(1, 999);

        const currentId = document.querySelector(`[name="client[adrId][id]"`).value.split('|');
        const currentValue = document.querySelector(`[name="client[adrId][text]"`).value.split('|');

        const valuesText = currentValue[0] + `|${city}|${cityArea}|${street}|${house}|${poBox}`;
        const idText = currentId[0] + '|-1|-1|-1|-1|-1';

        Helper.setValueWithChangeAndFocus(`[name="client[adrCity]"]`, city);
        Helper.setValue(`[name="client[adrCityArea]"]`, cityArea).removeAttribute('disabled');
        Helper.setValue(`[name="client[adrStreet]"]`, street).removeAttribute('disabled');
        Helper.setValue(`[name="client[adrHouse]"]`, house).removeAttribute('disabled');
        Helper.setValue(`[name="client[adrPostcode]"]`, poBox).removeAttribute('disabled');

        Helper.setValue(`[name="client[adrId][id]"]`, idText);
        Helper.setValue(`[name="client[adrId][text]"]`, valuesText)
    }

    static fillAppEmployerForm() {
        Helper.setValueWithChangeAndFocus('[name="client[employmentStatus]"]', 'Employee');
        Helper.setValue('[name="client[employerName]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="client[salaryPerCycleManual][amount]"]', Helper.generateRandomInteger(1000, 9999, 4).toString());
        Helper.setValue('[name="client[employerContactPerson]"]', Helper.generateRandomName_en() + ' ' + Helper.generateRandomName_en());
        Helper.setValue('[name="client[employerEmail]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[employerPhone]"]', Helper.generateRandomMobilePhone_zm());
    }

    static fillAppContactPerson() {
        Helper.setValue('[name="contact[name]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="contact[surname]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="contact[phone]"]', Helper.generateRandomMobilePhone_zm());
        Helper.setValueWithChangeAndFocus('[name="contact[relationType]"]', 'other');
        Helper.setValue('[name="contact[middleName]"]', Helper.generateRandomName_en());

    }
}