class Filler {

  static fillCmsApplication() {
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
    Helper.setValueWithChangeAndFocus(
      '[name="client[clientAddress][adrDivision]"]',
      divisions[selectedDivisionNumber].value
    );

    const valuesText = document.querySelector('[name="address[adrId]').value
      + `8|${district}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
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

    const port = chrome.extension.connect();
    port.postMessage(
      {
        'class': 'application',
        'method': 'onFilled',
        'data': {'type': 'web'}
      }
    );
    port.disconnect();
  }

  static fillErpApplication() {
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
    document.querySelector(
      '[name="client[adrDivision]"] + .bootstrap-select li[data-original-index="'
      + selectedDivisionNumber + '"] a'
    ).click();

    const valuesText = document.querySelector('[name="client[adrId][text]').value
      + `|${district}|${town}|${street}|${house}|${entrance}|${apartment}|${postalCode}|`;
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

    const port = chrome.extension.connect();
    port.postMessage(
      {
        'class': 'application',
        'method': 'onFilled',
        'data': {'type': 'erp'}
      }
    );
    port.disconnect();
  }

  static getInputsToFill(formName) {
    return document
      .querySelectorAll(`form[name="${formName}"] fieldset:not([disabled]) input:not([disabled]):not([type=hidden]):not([type=file]):not([readonly]),form[name="${formName}"]  fieldset:not([disabled]) select:not([disabled])`);
  }

  static getSatisfactoryInputs(formName) {
    return document
      .querySelectorAll(`form[name="${formName}"] fieldset:not([disabled]) input[type="radio"]:not([disabled])`);
  }

  static onTodoBodyChange(callback) {
    const target = document.querySelector('.todo_col2');

    Filler.observerOfTodoBody = new MutationObserver((mutations) => {
      mutations.filter(m => m.addedNodes.length)
        .forEach(() => {
          callback();
          Filler.observerOfTodoBody.disconnect();
        });
    });

    Filler.observerOfTodoBody.observe(target, {childList: true, subtree: true});
  }

  static fillSatisfatoryInputs(formName) {
    for (const satisfactory of Filler.getSatisfactoryInputs(formName)) {

      if (satisfactory.name.match(/\[[a-zA-Z]*]/)[0] === '[isSatisfactorily]' && satisfactory.value === '1') {
        satisfactory.click();
      }
    }
  }

  static fillCreditDbUpdateTodo() {
    const form = document.querySelector('form[name="creditdb_request_form"]');
    const inputName = form.elements[0].elements[0].name;
    const id = inputName.match(/[\d]+/)[0];
    const selectorStart = `[name="md[${id}][`;

    const unlockManual = document.querySelector(`${selectorStart}unlockForManual]"]`);

    if (!unlockManual.checked) {
      unlockManual.click();
    }

    if (!unlockManual.checked) {
      return false;
    }

    Helper.setValue(`${selectorStart}debtAmount]"]`, 0);
    Helper.setValue(`${selectorStart}debtCount]"]`, 0);
    Helper.setValue(`${selectorStart}loanAmount]"]`, 0);
    Helper.setValue(`${selectorStart}loanCount]"]`, 0);
    Helper.setValue(`${selectorStart}loanMonthlyAmount]"]`, 0);
    Helper.setValue(`${selectorStart}worstStatus]"]`, 0);
    Helper.setValue(`${selectorStart}debtAmountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}debtCountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}loanAmountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}loanCountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}loanMonthlyAmountRelated]"]`, 0);
    Helper.setValue(`${selectorStart}worstStatusRelated]"]`, 0);
    Helper.setValue(`${selectorStart}lastInquiryDate]"]`, Helper.generateRandomDate());
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
              input.click();
            }
            break;
          default:
            break;
        }
      }

      Filler.fillSatisfatoryInputs(formName);
    };


    if (inputsToFill.length === 0 && addDocumentButton) {
      Filler.onTodoBodyChange(insertData);

      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }

  static fillHouseholdBillForm() {
    const addDocumentButton = document.querySelector('#add-household-bill');
    const billTypes = ['electricity', 'home_phone', 'other'];
    const formName = 'client_household_bill_form';

    let inputsToFill = Filler.getInputsToFill(formName);

    const insertData = () => {
      inputsToFill = Filler.getInputsToFill(formName);

      for (const input of inputsToFill) {
        switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
          case'[billType]':
            input.value = billTypes[Math.floor(Math.random() * billTypes.length)];
            break;
          case'[billPeriodStart]':
            input.value = Helper.generateRandomDate();
            break;
          case'[billPeriodEnd]':
            input.value = Helper.generateRandomDate(true);
            break;
          case'[isAddressTheSameInApplication]':
            if (input.value === '1') {
              input.click();
            }
            break;
          default:
            break;
        }
      }

      Filler.fillSatisfatoryInputs(formName);
    };

    if (inputsToFill.length === 0 && addDocumentButton) {
      Filler.onTodoBodyChange(insertData);
      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }

  static fillPayrollOrIrsForm() {
    const addDocumentButton = document.querySelector('#add-payroll-or-irs');
    const formName = 'client_payroll_or_irs_form';

    let inputsToFill = Filler.getInputsToFill(formName);

    const insertData = () => {
      inputsToFill = Filler.getInputsToFill(formName);
      for (const input of inputsToFill) {
        switch (input.name.match(/\[[a-zA-Z]*]/)[0]) {
          case'[occupation]':
          case'[employerName]':
            input.value = Helper.generateRandomName();
            break;
          case'[additionalIncome]':
            if (input.type === 'number') {
              input.value = Helper.generateRandomInteger(300, 3000);
            } else {
              const additionalIncomTypes = input.children;
              let randomKey = Math.floor(Math.random() * additionalIncomTypes.length);

              if (randomKey === 0) {
                randomKey++;
              }

              input.value = additionalIncomTypes[randomKey].value;
            }
            break;
          case'[income]':
            if (input.classList.contains('money_amount_inp')) {
              input.value = Helper.generateRandomInteger(300, 3000);
            }
            break;
          default:
            break;
        }
      }
      Helper.setValueWithChangeAndFocus(inputsToFill[3], inputsToFill[3].value);
      Filler.fillSatisfatoryInputs(formName);
    };

    if (inputsToFill.length === 0 && addDocumentButton) {
      Filler.onTodoBodyChange(insertData);
      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }

  static fillPrimaryInfoForm() {
    Helper.setValue('[name="client[homePhone]"]', Helper.generateRandomHomePhone());
  }

  static fillEmployerForm() {
    Helper.setValueWithChangeAndFocus('[name="client[clientEmploymentStatus]"]', 1);
    Helper.setValue('[name="client[clientEmployers][0][dateOfEmployment]"]', Helper.generateRandomDate());
    Helper.setValue('[name="client[clientEmployers][0][title]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[clientEmployers][0][contactPerson]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[clientEmployers][0][email]"]', Helper.generateRandomEmail());
    Helper.setValue('[name="client[clientEmployers][0][phone]"]', Helper.generateRandomHomePhone());
  }

  static fillBankAccountForm() {
    document.querySelector('input[name="isPrimary"][value="1"]').click();
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

    observerOfSuggestions.observe(target, {attributes: true});

    Helper.setValueWithChangeAndFocus('input[name="bankName"]', bankName);
  }
}