(function() {

  function fillErpApplication() {
    Helper.setValue('[name="service[amount][amount]"]', 10000);
    Helper.setValue('[name="client[clientIdentificator]"]', Helper.getRandomMap());
    Helper.setValue('[name="client[name]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[fathersName]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[surname]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[email]"]', Helper.generateRandomEmail());
    Helper.setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone());
    Helper.setValue('[name="client[documentNumber]"]', Helper.generateRandomInteger(1000, 100000));
    document.querySelector('[data-normalized-text="Passport"]').click();

    const district = Helper.generateRandomName();
    const town = Helper.generateRandomName();
    const street = Helper.generateRandomName();
    const house = Helper.generateRandomInteger(1, 999);
    const entrance = Helper.generateRandomInteger(1, 999);
    const apartment = Helper.generateRandomInteger(1, 999);
    const postalCode = Helper.generateRandomInteger(1, 999);

    const divisions = document.querySelector('[name="client[adrDivision]"]').children;
    const selectedDivisionNumber = Helper.generateRandomInteger(0, divisions.length - 1);
    document.querySelector('[name="client[adrDivision]"] + .bootstrap-select li[data-original-index="' + selectedDivisionNumber + '"] a').click();

    const valuesText = document.querySelector('[name="client[adrId][text]').value + `|${district}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
    const idText = document.querySelector('[name="client[adrId][id]"]').value + '|-1|-1|-1|-1|-1|-1|-1';

    Helper.setValue('[name="client[adrId][id]"]', idText);
    Helper.setValue('[name="client[adrId][text]', valuesText);
    Helper.setValue('[name="client[adrDistrict]"]', district);
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

  function fillCmsApplication() {
    Helper.setValueWithChangeAndFocus('[name="identificationNumber"]', Helper.getRandomMap());
    Helper.setValueWithChangeAndFocus('[name="name"]', Helper.generateRandomName());
    Helper.setValueWithChangeAndFocus('[name="fathersName"]', Helper.generateRandomName());
    Helper.setValueWithChangeAndFocus('[name="surname"]', Helper.generateRandomName());
    Helper.setValueWithChangeAndFocus('[name="email"]', Helper.generateRandomEmail());
    Helper.setValueWithChangeAndFocus('[name="phone"]', Helper.generateRandomMobilePhone());

    const district = Helper.generateRandomName();
    const town = Helper.generateRandomName();
    const street = Helper.generateRandomName();
    const house = Helper.generateRandomInteger(1, 999);
    const entrance = Helper.generateRandomInteger(1, 999);
    const apartment = Helper.generateRandomInteger(1, 999);
    const postalCode = Helper.generateRandomInteger(1, 999);

    const divisions = document.querySelector('[name="client[clientAddress][adrDivision]"]').children;
    const selectedDivisionNumber = Helper.generateRandomInteger(0, divisions.length - 1);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrDivision]"]', divisions[selectedDivisionNumber].value);

    const valuesText = document.querySelector('[name="address[adrId]').value + `8|${district}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
    const idText = document.querySelector('[name="address[adrText]"]').value + 'Berat|-1|-1|-1|-1|-1|-1|-1';

    Helper.setValue('[name="address[adrId]"]', idText);
    Helper.setValue('[name="address[adrText]"]', valuesText);

    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrDistrict]"]', district);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrCity]"]', town);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrStreet]"]', street);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrHouse]"]', house);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrEntrance]"]', entrance);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrApartment]"]', apartment);
    Helper.setValueWithChangeAndFocus('[name="client[clientAddress][adrPostcode]"]', postalCode);

    const password = Helper.generateRandomName(8, true) + Helper.generateRandomInteger(0, 9);
    Helper.setValueWithChangeAndFocus('[name="password"]', password);
    Helper.setValueWithChangeAndFocus('[name="passwordVerification"]', password);
    document.querySelector('[name="password"]').type = 'text';
    document.querySelector('[name="passwordVerification"]').type = 'text';

    if (!document.querySelector('[name="acceptTerms').checked) {
      document.querySelector('[name="acceptTerms').click();
    }
  }

  switch (document.location.pathname) {
    case '/loan/application/apply/registration':
      fillCmsApplication();
      break;
    case '/applications/add':
      fillErpApplication();
      break;
    default:
      break;
  }

})();