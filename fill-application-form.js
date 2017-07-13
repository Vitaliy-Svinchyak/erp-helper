(function() {
  function fillErpApplication() {
    document.querySelector('[name="client[clientIdentificator]"]').value = Helper.getRandomMap();
    document.querySelector('[name="client[name]"]').value = Helper.generateRandomName();
    document.querySelector('[name="client[fathersName]"]').value = Helper.generateRandomName();
    document.querySelector('[name="client[surname]"]').value = Helper.generateRandomName();
    document.querySelector('[name="client[email]"]').value = Helper.generateRandomEmail();
    document.querySelector('[name="client[phone]"]').value = Helper.generateRandomMobilePhone();
    document.querySelector('[name="client[documentNumber]"]').value = Helper.getRandomInteger(1000, 100000);
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

    document.querySelector('[name="client[adrId][id]"]').value = idText;
    document.querySelector('[name="client[adrId][text]').value = valuesText;
    document.querySelector('[name="client[adrDistrict]"]').value = district;
    document.querySelector('[name="client[adrCity]"]').value = town;
    document.querySelector('[name="client[adrStreet]"]').value = street;
    document.querySelector('[name="client[adrHouse]"]').value = house;
    document.querySelector('[name="client[adrEntrance]"]').value = entrance;
    document.querySelector('[name="client[adrApartment]"]').value = apartment;
    document.querySelector('[name="client[adrPostcode]"]').value = postalCode;

    document.querySelector('[name="client[adrCity]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrStreet]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrHouse]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrEntrance]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrApartment]"]').removeAttribute('disabled');
    document.querySelector('[name="client[adrPostcode]"]').removeAttribute('disabled');

    document.querySelector('[name="service[amount][amount]"').focus();
  }

  function fillCmsApplication() {
    document.querySelector('[name="identificationNumber"]').value = Helper.getRandomMap();
    document.querySelector('[name="name"]').value = Helper.generateRandomName();
    document.querySelector('[name="fathersName"]').value = Helper.generateRandomName();
    document.querySelector('[name="surname"]').value = Helper.generateRandomName();
    document.querySelector('[name="email"]').value = Helper.generateRandomEmail();
    document.querySelector('[name="phone"]').value = Helper.generateRandomMobilePhone();

    const district = Helper.generateRandomName();
    const town = Helper.generateRandomName();
    const street = Helper.generateRandomName();
    const house = Helper.getRandomInteger(1, 999);
    const entrance = Helper.getRandomInteger(1, 999);
    const apartment = Helper.getRandomInteger(1, 999);
    const postalCode = Helper.getRandomInteger(1, 999);

    const divisions = document.querySelector('[name="client[clientAddress][adrDivision]"]').children;
    const selectedDivisionNumber = Helper.getRandomInteger(0, divisions.length - 1);
    document.querySelector('[name="client[clientAddress][adrDivision]"]').value = divisions[selectedDivisionNumber].value;

    document.querySelector('[name="client[clientAddress][adrDistrict]"]').value = district;
    document.querySelector('[name="client[clientAddress][adrCity]"]').value = town;
    document.querySelector('[name="client[clientAddress][adrStreet]"]').value = street;
    document.querySelector('[name="client[clientAddress][adrHouse]"]').value = house;
    document.querySelector('[name="client[clientAddress][adrEntrance]"]').value = entrance;
    document.querySelector('[name="client[clientAddress][adrApartment]"]').value = apartment;
    document.querySelector('[name="client[clientAddress][adrPostcode]"]').value = postalCode;

    const password = Helper.generateRandomString(8) + Helper.getRandomInteger(0, 9);
    document.querySelector('[name="password"]').value = password;
    document.querySelector('[name="passwordVerification"]').value = password;
    document.querySelector('[name="password"]').type = 'text';
    document.querySelector('[name="passwordVerification"]').type = 'text';

    document.querySelector('[name="acceptTerms').click();

  }

  if (document.location.pathname === '/loan/application/apply/registration') {
    fillCmsApplication();
  }

  if (document.location.pathname === '/applications/add') {
    fillErpApplication();
  }

})();