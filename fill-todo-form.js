(function() {
  let observerOfTodoBody;
  const locationArr = window.location.pathname.split('/');

  if (locationArr[1] !== 'applications' || locationArr[2] !== 'todo') {
    return false;
  }

  function getInputsToFill(formName) {
    return document
      .querySelectorAll(`form[name="${formName}"] fieldset:not([disabled]) input:not([disabled]):not([type=hidden]):not([type=file]):not([readonly]),form[name="${formName}"]  fieldset:not([disabled]) select:not([disabled])`);
  }

  function getSatisfactoryInputs(formName) {
    return document
      .querySelectorAll(`form[name="${formName}"] fieldset:not([disabled]) input[type="radio"]:not([disabled])`);
  }

  function onTodoBodyChange(callback) {
    const target = document.querySelector('.todo_col2');

    observerOfTodoBody = new MutationObserver((mutations) => {
      mutations.filter(m => m.addedNodes.length)
        .forEach(() => {
          callback();
          observerOfTodoBody.disconnect();
        });
    });

    observerOfTodoBody.observe(target, {childList: true, subtree: true});
  }

  function fillSatisfatoryInputs(formName) {
    for (const satisfactory of getSatisfactoryInputs(formName)) {

      if (satisfactory.name.match(/\[[a-zA-Z]*]/)[0] === '[isSatisfactorily]' && satisfactory.value === '1') {
        satisfactory.click();
      }
    }
  }

  function fillCreditDbUpdateTodo() {
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

  function fillIdDocumentForm() {
    const addDocumentButton = document.querySelector('#add-id-document');
    const formName = 'client_id_document_form';
    let inputsToFill = getInputsToFill(formName);

    const insertData = () => {
      inputsToFill = getInputsToFill(formName);

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

      fillSatisfatoryInputs(formName);
    };


    if (inputsToFill.length === 0 && addDocumentButton) {
      onTodoBodyChange(insertData);

      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }

  function fillHouseholdBillForm() {
    const addDocumentButton = document.querySelector('#add-household-bill');
    const billTypes = ['electricity', 'home_phone', 'other'];
    const formName = 'client_household_bill_form';

    let inputsToFill = getInputsToFill(formName);

    const insertData = () => {
      inputsToFill = getInputsToFill(formName);

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

      fillSatisfatoryInputs(formName);
    };

    if (inputsToFill.length === 0 && addDocumentButton) {
      onTodoBodyChange(insertData);
      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }

  function fillPayrollOrIrsForm() {
    const addDocumentButton = document.querySelector('#add-payroll-or-irs');
    const formName = 'client_payroll_or_irs_form';

    let inputsToFill = getInputsToFill(formName);

    const insertData = () => {
      inputsToFill = getInputsToFill(formName);
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
      fillSatisfatoryInputs(formName);
    };

    if (inputsToFill.length === 0 && addDocumentButton) {
      onTodoBodyChange(insertData);
      addDocumentButton.click();

      return true;
    } else if (inputsToFill.length === 0) {
      return false;
    }

    insertData();
  }

  function fillPrimaryInfoForm() {
    Helper.setValue('[name="client[homePhone]"]', Helper.generateRandomHomePhone());
  }

  function fillEmployerForm() {
    Helper.setValueWithChangeAndFocus('[name="client[clientEmploymentStatus]"]', 1);
    Helper.setValue('[name="client[clientEmployers][0][dateOfEmployment]"]', Helper.generateRandomDate());
    Helper.setValue('[name="client[clientEmployers][0][title]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[clientEmployers][0][contactPerson]"]', Helper.generateRandomName());
    Helper.setValue('[name="client[clientEmployers][0][email]"]', Helper.generateRandomEmail());
    Helper.setValue('[name="client[clientEmployers][0][phone]"]', Helper.generateRandomHomePhone());
  }

  function fillBankAccountForm() {
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


  switch (locationArr[4]) {
    case 'creditdb-update':
      fillCreditDbUpdateTodo();
      break;
    case 'id-document':
      fillIdDocumentForm();
      break;
    case 'household-bill':
      fillHouseholdBillForm();
      break;
    case 'payroll-or-irs':
      fillPayrollOrIrsForm();
      break;
    case 'client-primary-info':
      fillPrimaryInfoForm();
      break;
    case 'employer-and-insurance':
      fillEmployerForm();
      break;
    case 'bank-account-confirmation':
      fillBankAccountForm();
      break;
    default:
      break;
  }

})();