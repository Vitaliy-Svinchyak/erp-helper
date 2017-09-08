class Helper {
    static generateRandomInteger(minValue, maxValue, numberLength) {
        let number = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        return Helper.generateZerosBeforeNumber(number, numberLength);
    }

    static generateZerosBeforeNumber(number, numberLength) {
        const nLength = number.toString().length;

        if (nLength < numberLength) {
            number = '0'.repeat(numberLength - nLength) + number;
        }

        return number;
    }

    static translateYear(year) {
        const toTranslate = +String(year).substr(0, 3);
        const reduce = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];

        return reduce[toTranslate - 180] + String(year).substr(3, 1);
    }

    static getRandomIdNumber_al() {
        const DD = Helper.generateRandomInteger(1, 28, 2).toString();
        const sex = Helper.generateRandomInteger(1, 2, 1).toString();
        const MM = sex === 1 ? Helper.generateRandomInteger(1, 12, 2).toString() :
            Helper.generateRandomInteger(51, 62, 2).toString();
        const SSS = Helper.generateRandomInteger(1, 999, 3).toString();
        const YYYY = Helper.generateRandomInteger(1970, 1999, 4);
        const YY = Helper.translateYear(YYYY);
        const C = YY[0];

        return YY + MM + DD + SSS + C;
    }

    static getRandomIdNumber_mk() {
        const DD = Helper.generateRandomInteger(1, 28, 2).toString();
        const MM = Helper.generateRandomInteger(1, 13, 2).toString();
        const YYY = Helper.generateRandomInteger(970, 995, 3).toString();
        const RR = Helper.generateRandomInteger(41, 50, 2).toString();
        const BBB = Helper.generateRandomInteger(0, 999, 3).toString();
        const s = DD + MM + YYY + RR + BBB;
        let K = ( ( 7 * (+s[0] + +s[6]) + 6 * (+s[1] + +s[7]) + 5 * (+s[2] + +s[8]) + 4 * (+s[3] + +s[9]) + 3 * (+s[4] + +s[10]) + 2 * (+s[5] + +s[11]) ) % 11);
        K = 11 - K;

        if (K > 9) {
            K = 0;
        }

        return s + K;
    }

    static generateRandomString(stringLength, onlyEnglish) {
        stringLength = stringLength || Helper.generateRandomInteger(3, 10);
        onlyEnglish = onlyEnglish || false;
        let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'k', 'l', 'm',
            'n', 'p', 'q', 'r', 's', 't', 'v', 'x', 'z', 'dh', 'gj', 'll', 'nj', 'rr', 'th', 'xh', 'zh',
            'sf', 'tj', 'kr', 'nd', 'kz', 'st', 'nc', 'mb'];
        let vowels = ['a', 'e', 'o', 'u', 'y', 'i', 'ye'];

        if (!onlyEnglish) {
            consonants = consonants.concat(['ç']);
            vowels = vowels.concat(['ë', 'ë', 'ë']);
        }

        let i = 0;
        let string = '';
        let lastLetterType = Helper.generateRandomInteger(0, 2);


        while (i < stringLength) {
            let letter;

            if (lastLetterType === 0) {
                letter = consonants[Helper.generateRandomInteger(0, consonants.length - 1)];
                lastLetterType = 1;
            } else {
                letter = vowels[Helper.generateRandomInteger(0, vowels.length - 1)];
                lastLetterType = 0;
            }

            if (letter.length > 1 && i + 1 === stringLength) {
                stringLength++;
            }

            string += letter;

            i++;
        }

        return string;
    }

    static generateRandomName(nameLength, onlyEnglish) {
        const name = Helper.generateRandomString(nameLength, onlyEnglish);

        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    static generateRandomEmail() {
        return Helper.generateRandomString(null, true) + '@' + Helper.generateRandomString(4, true) + '.com';
    }

    static generateRandomMobilePhone_al() {
        const startVariants = [66, 67, 68, 69];
        const startNumber = startVariants[Helper.generateRandomInteger(0, startVariants.length - 1)];

        return startNumber.toString() + Helper.generateRandomInteger(1111111, 9999999).toString();
    }

    static generateRandomMobilePhone_mk() {
        const startVariants = ['02', '03', '04', '07'];
        const startNumber = startVariants[Helper.generateRandomInteger(0, startVariants.length - 1)];

        return startNumber.toString() + Helper.generateRandomInteger(111111, 999999).toString();
    }

    static generateRandomHomePhone() {
        return '4' + Helper.generateRandomInteger(1111111, 9999999).toString();
    }

    static generateRandomDate(inFuture) {
        inFuture = inFuture || false;
        const year = inFuture ? Helper.generateRandomInteger(2018, 2020, 4) : Helper.generateRandomInteger(2000, 2016, 4);

        return Helper.generateRandomInteger(1, 28, 2).toString() + '/' +
            Helper.generateRandomInteger(1, 12, 2).toString() + '/' +
            year.toString();
    }

    static generateRandomBirthday() {
        const year = Helper.generateRandomInteger(1970, 1995, 4);

        return Helper.generateRandomInteger(1, 28, 2).toString() + '/' +
            Helper.generateRandomInteger(1, 12, 2).toString() + '/' +
            year.toString();
    }

    static setValue(selector, value) {
        let element;

        if (typeof( selector ) === 'string') {
            element = document.querySelector(selector);
        } else {
            element = selector;
        }

        if (!element) {
            return false;
        }

        element.value = value;

        return element;
    }

    static setValueWithChangeAndFocus(selector, value) {
        const element = Helper.setValue(selector, value);

        if (!element) {
            return false;
        }

        element.dispatchEvent(new Event('change', {bubbles: true, cancelable: false}));
        element.dispatchEvent(new Event('focus', {bubbles: true, cancelable: false}));
    }

    static clickElement(selector) {
        let element;

        if (typeof( selector ) === 'string') {
            element = document.querySelector(selector);
        } else {
            element = selector;
        }

        if (!element) {
            return false;
        }

        element.click();
    }

    static renderModal(content) {
        const modal = document.querySelector('erp-helper-modal');

        if (modal) {
            modal.innerHTML = content;
        } else {
            const html = `<background-screen>
                            <erp-helper-modal>
                                ${content}
                            </erp-helper-modal>
                        </background-screen>`;
            document.body.insertAdjacentHTML('beforeend', html);
            document.querySelector('background-screen').addEventListener('click', e => {
                if (e.target.tagName === 'BACKGROUND-SCREEN') {
                    document.body.removeChild(document.querySelector('background-screen'));
                }
            });
        }
    }
}