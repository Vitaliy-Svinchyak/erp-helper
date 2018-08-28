"use strict";

class BotswanaFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 2000);
        Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomIdNumber_bw());
        Helper.setValue('[name="client[name]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="client[surname]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="client[birthday]"]', Helper.generateRandomBirthday());
        Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
        Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone_bw());
        Helper.setValueWithChangeAndFocus('[name="client[maritalStatus]"]', 'single');
        Helper.setValueWithChangeAndFocus('[name="client[gender]"]', 'm');
        Helper.setValueWithChangeAndFocus('[name="service[payDateOfMonth]"]', '10');


        BotswanaFiller.fillAddresses();
        BotswanaFiller.fillAppEmployerForm();
        BotswanaFiller.fillAppFirstContactPersonDetails();
        BotswanaFiller.fillAppSecondContactPersonDetails();
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
        Helper.setValue('[name="client[employerPhone]"]', Helper.generateRandomMobilePhone_bw());
    }

    static fillAppFirstContactPersonDetails() {
        Helper.setValue('[name="firstContact[name]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="firstContact[surname]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="firstContact[phone]"]', Helper.generateRandomMobilePhone_bw());
        Helper.setValueWithChangeAndFocus('[name="firstContact[relationType]"]', 'other');
    }

    static fillAppSecondContactPersonDetails() {
        Helper.setValue('[name="secondContact[name]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="secondContact[surname]"]', Helper.generateRandomName_en());
        Helper.setValue('[name="secondContact[phone]"]', Helper.generateRandomMobilePhone_bw());
        Helper.setValueWithChangeAndFocus('[name="secondContact[relationType]"]', 'other');
    }
}