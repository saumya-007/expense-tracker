class ServiceUtils {
    constructor() { }

    static getFunctions() {
        return Object.freeze({
            capitalizeFirstLetters: Converters.capitalizeFirstLetters,
            generateRandomNumber: Generators.generateRandomNumber,
            convertToMilliseconds: Converters.convertToMilliseconds
        })
    }

}

class Converters {
    constructor() { }

    static capitalizeFirstLetters({ str, withSpace = false, skipFirst = false }) {
        let regex;
        skipFirst ? regex = /( )([^ ]?)/g : regex = /( |^)([^ ]?)/g;
        return str.replace(regex, function (_, prep, letter) {
            return (prep && withSpace ? ' ' : '') + letter.toUpperCase();
        });
    };

    static convertToMilliseconds({ timeString }) {
        const timeValue = timeString.substring(0, timeString.length - 1);
        const timeFormat = timeString.substring(timeString.length - 1);
        console.log(timeValue, timeFormat)
        let result;
        switch (timeFormat) {
            case 'h':
                result = timeValue * 3600000;
                break;
            case 'm':
                result = timeValue * 60000;
                break;
            case 's':
                result = timeValue * 1000;
                break;
            default:
                result = timeValue * 1;
        }
        console.log(result);
        return result;
    }
}

class Generators {
    constructor() { }
    static generateRandomNumber() {
        return Date.now() + '-' + Math.round(Math.random() * 1E9);
    }
}

module.exports = ServiceUtils;
