"use strict";

const token = 'undefined_user_erp_helper';
// const host = 'https://erphelper.000webhostapp.com';
const host = 'http://erphelper.ga';

const webdb = {
    open: () => {
        const dbSize = 5 * 1024 * 1024; // 5MB
        webdb.db = openDatabase('erp', '1', 'Statistic db', dbSize);
    },
    onError: (tx, e) => {
        console.error('There has been an error: ' + e.message);
    },
    onSuccess: (tx, r) => {
    },
    createTable: () => {
        const db = webdb.db;
        db.transaction(function (tx) {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS
              input_changes (
              name       TEXT,
              value      TEXT,
              page       TEXT,
              changed_at DATETIME
            )`, []);
        });
    },
    addInputChange: (inputName, inputValue, page) => {
        const db = webdb.db;

        db.transaction(tx => {
            const changedAt = new Date();
            tx.executeSql('INSERT INTO input_changes(name,value,page, changed_at) VALUES (?,?,?,?)',
                [inputName, inputValue, page, changedAt],
                webdb.onSuccess,
                webdb.onError);
        });
    },
    getAllInputChanges: (callback) => {
        const db = webdb.db;

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM input_changes', [], callback,
                webdb.onError);
        });
    },
    deleteSynchronizedInputChanges: (lastId) => {
        const db = webdb.db;

        db.transaction(tx => {
            tx.executeSql('DELETE FROM input_changes WHERE ROWID <= ?', [lastId],
                webdb.onSuccess,
                webdb.onError);
        });
    }
};

window.erpStatistic = {
    logInputChange: (message) => {
        webdb.addInputChange(message.name, message.value, message.page);
    }
};

function syncDataWithBackend() {
    const onGetData = (tx, data) => {

        const message = {
            inputChanges: Array.prototype.slice.call(data.rows),
            user: 'unknown',
            userInfo: {},
            usageOfFeatures: {},
            historyOfPageTransitions: {},
        };
        if (!message.inputChanges.length) {
            return;
        }

        const xhr = new XMLHttpRequest();

        xhr.open('POST', `${host}/statistic/sync`, true);
        xhr.setRequestHeader('X-Auth-Token', token);
        xhr.send(JSON.stringify(message));

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;

            if (xhr.status === 200) {
                const lastChange = message.inputChanges[message.inputChanges.length - 1];
                webdb.deleteSynchronizedInputChanges(lastChange.id);
            }
        };
    };

    webdb.getAllInputChanges(onGetData);

}

window.onload = function () {

    webdb.open();
    // webdb.db.transaction(function (tx) {
    //     tx.executeSql('DROP TABLE input_changes');
    // });
    webdb.createTable();

    // setInterval(syncDataWithBackend, 5000);

    /**
     * @param {{class,data,method}}options
     */
    const factory = (options) => {
        if (options && options.class && options.method) {
            if (options.data) {
                window[options.class][options.method](options.data);
            } else {
                window[options.class][options.method]();
            }
        }
    };

    chrome.extension.onConnect.addListener(function (port) {
        port.onMessage.addListener(factory);
    });
}
;
