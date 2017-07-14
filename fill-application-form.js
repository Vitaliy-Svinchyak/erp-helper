(function() {
  function setValue(selector, value) {
    document.querySelector(selector).value = value;
  }

  function setValueWithChangeAndFocus(selector, value) {
    const element = document.querySelector(selector);
    element.value = value;

    element.dispatchEvent(new Event('change', {bubbles: true, cancelable: false}));
    element.dispatchEvent(new Event('focus', {bubbles: true, cancelable: false}));
    return element;
  }

  function fillErpApplication() {
    setValue('[name="service[amount][amount]"]', 10000);
    setValue('[name="client[clientIdentificator]"]', Helper.getRandomMap());
    setValue('[name="client[name]"]', Helper.generateRandomName());
    setValue('[name="client[fathersName]"]', Helper.generateRandomName());
    setValue('[name="client[surname]"]', Helper.generateRandomName());
    setValue('[name="client[email]"]', Helper.generateRandomEmail());
    setValue('[name="client[phone]"]', Helper.generateRandomMobilePhone());
    setValue('[name="client[documentNumber]"]', Helper.getRandomInteger(1000, 100000));
    document.querySelector('[data-normalized-text="Passport"]').click();

    const district = Helper.generateRandomName();
    const town = Helper.generateRandomName();
    const street = Helper.generateRandomName();
    const house = Helper.getRandomInteger(1, 999);
    const entrance = Helper.getRandomInteger(1, 999);
    const apartment = Helper.getRandomInteger(1, 999);
    const postalCode = Helper.getRandomInteger(1, 999);

    const divisions = document.querySelector('[name="client[adrDivision]"]').children;
    const selectedDivisionNumber = Helper.getRandomInteger(0, divisions.length - 1);
    document.querySelector('[name="client[adrDivision]"] + .bootstrap-select li[data-original-index="' + selectedDivisionNumber + '"] a').click();

    const valuesText = document.querySelector('[name="client[adrId][text]').value + `|${district}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
    const idText = document.querySelector('[name="client[adrId][id]"]').value + '|-1|-1|-1|-1|-1|-1|-1';

    setValue('[name="client[adrId][id]"]', idText);
    setValue('[name="client[adrId][text]', valuesText);
    setValue('[name="client[adrDistrict]"]', district);
    setValue('[name="client[adrCity]"]', town);
    setValue('[name="client[adrStreet]"]', street);
    setValue('[name="client[adrHouse]"]', house);
    setValue('[name="client[adrEntrance]"]', entrance);
    setValue('[name="client[adrApartment]"]', apartment);
    setValue('[name="client[adrPostcode]"]', postalCode);

    document.querySelector('[name="client[adrCity]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrStreet]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrHouse]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrEntrance]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrApartment]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrPostcode]"]').removeAttribute('disabled');

    document.querySelector('[name="service[amount][amount]"').focus();
  }

  function fillCmsApplication() {
    setValueWithChangeAndFocus('[name="identificationNumber"]', Helper.getRandomMap());
    setValueWithChangeAndFocus('[name="name"]', Helper.generateRandomName());
    setValueWithChangeAndFocus('[name="fathersName"]', Helper.generateRandomName());
    setValueWithChangeAndFocus('[name="surname"]', Helper.generateRandomName());
    setValueWithChangeAndFocus('[name="email"]', Helper.generateRandomEmail());
    setValueWithChangeAndFocus('[name="phone"]', Helper.generateRandomMobilePhone());

    const district = Helper.generateRandomName();
    const town = Helper.generateRandomName();
    const street = Helper.generateRandomName();
    const house = Helper.getRandomInteger(1, 999);
    const entrance = Helper.getRandomInteger(1, 999);
    const apartment = Helper.getRandomInteger(1, 999);
    const postalCode = Helper.getRandomInteger(1, 999);

    const divisions = document.querySelector('[name="client[clientAddress][adrDivision]"]').children;
    const selectedDivisionNumber = Helper.getRandomInteger(0, divisions.length - 1);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrDivision]"]', divisions[selectedDivisionNumber].value);

    const valuesText = document.querySelector('[name="address[adrId]').value + `8|${district}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
    const idText = document.querySelector('[name="address[adrText]"]').value + 'Berat|-1|-1|-1|-1|-1|-1|-1';

    setValue('[name="address[adrId]"]', idText);
    setValue('[name="address[adrText]"]', valuesText);

    setValueWithChangeAndFocus('[name="client[clientAddress][adrDistrict]"]', district);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrCity]"]', town);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrStreet]"]', street);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrHouse]"]', house);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrEntrance]"]', entrance);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrApartment]"]', apartment);
    setValueWithChangeAndFocus('[name="client[clientAddress][adrPostcode]"]', postalCode);

    const password = Helper.generateRandomName(8, true) + Helper.getRandomInteger(0, 9);
    setValueWithChangeAndFocus('[name="password"]', password);
    setValueWithChangeAndFocus('[name="passwordVerification"]', password);
    document.querySelector('[name="password"]').type = 'text';
    document.querySelector('[name="passwordVerification"]').type = 'text';

    if (!document.querySelector('[name="acceptTerms').checked) {
      document.querySelector('[name="acceptTerms').click();
    }
  }

  if (document.location.pathname === '/loan/application/apply/registration') {
    fillCmsApplication();
  }

  if (document.location.pathname === '/applications/add') {
    fillErpApplication();
  }

})();