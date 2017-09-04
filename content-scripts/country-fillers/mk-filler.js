class MacedonianFiller {
    static fillErpApplication() {
        Helper.setValue('[name="service[amount][amount]"]', 10000);
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
}