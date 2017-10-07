"use strict";

const erpHelperRouter = {
    route: (options) => {
        switch (options.action) {
            case 'fill':
                erpHelperRouter.fillApplication();
                erpHelperRouter.fillTodo();
                erpHelperRouter.fillTrifle();
                break;
            case 'help':
                TipsManager.showHelp();
                break;
            default:
                break;
        }
    },

    fillApplication: () => {
        switch (document.location.pathname) {
            case '/loan/application/apply/registration':
            case '/loan/application/apply-step-two/details/private':
                Filler.fillCmsApplication();
                break;
            case '/applications/add':
                Filler.executeFillerFunction('fillErpApplication');
                break;
            default:
                break;
        }
    },

    fillTodo: () => {
        const locationArr = window.location.pathname.split('/');

        if (locationArr[1] !== 'applications' || locationArr[2] !== 'todo') {
            return false;
        }

        switch (locationArr[4]) {
            case 'creditdb-update':
                Filler.fillCreditDbUpdateTodo();
                break;
            case 'id-document':
                Filler.executeFillerFunction('fillIdDocumentForm');
                break;
            case 'household-bill':
                Filler.fillHouseholdBillForm();
                break;
            case 'payroll-or-irs':
                Filler.fillPayrollOrIrsForm();
                break;
            case 'client-primary-info':
                Filler.executeFillerFunction('fillPrimaryInfoForm');
                break;
            case 'employer-and-insurance':
                Filler.executeFillerFunction('fillEmployerForm');
                break;
            case 'bank-account-confirmation':
                Filler.executeFillerFunction('fillBankAccountForm');
                break;
            case 'bank-statement':
                Filler.executeFillerFunction('fillBankStatementForm');
                break;
            case 'confirm-check':
                Filler.fillConfirmCheckForm();
                break;
            default:
                break;
        }
    },

    fillTrifle: () => {
        switch (document.location.pathname) {
            case '/payments/add-external-credit-payment-for-invoices':
                Filler.fillPayment();
                break;
            case '/registration/new-client-registration':
                Filler.fillClientRegistration();
                break;
            default:
                break;
        }

        const pathParts = document.location.pathname.split('/');
        if (pathParts[1] === 'payments' && pathParts[2] === 'edit') {
            Filler.assignPayment();
        }

    }
};
const formManager = new FormManager();
const statisticCollector = new StatisticCollector();
window.erpHelperPort = chrome.extension.connect();

chrome.runtime.onMessage.addListener(erpHelperRouter.route);

window.document.body.addEventListener('keydown', e => {
    if (e.ctrlKey && e.code === 'KeyQ') {
        erpHelperRouter.route({action: 'fill'});
        setTimeout(() => formManager.detectFormChanges(), 200);
    }

    if (e.ctrlKey && e.code === 'KeyB') {
        formManager.showFormChanges()
    }

    if (e.code === 'Escape' && document.querySelector('background-screen')) {
        document.body.removeChild(document.querySelector('background-screen'));
    }
});

window.document.body.addEventListener('change', e => {
    formManager.logInputChange(e.target);
    statisticCollector.logInputChange(e.target);
});

// js errors + ajax errors
window.addEventListener('error', TipsManager.renderErrorTip);
// violates private policy
// if ($ && $ instanceof Function) {
//     $(document).ajaxError(TipsManager.renderErrorTip);
// }