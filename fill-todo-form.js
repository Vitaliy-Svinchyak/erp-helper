(function() {
  const locationArr = window.location.pathname.split('/');

  if (locationArr[1] !== 'applications' || locationArr[2] !== 'todo') {
    return false;
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

    if(!unlockManual.checked){
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


  switch (locationArr[4]) {
    case 'creditdb-update':
      fillCreditDbUpdateTodo();
      break;
  }

})();