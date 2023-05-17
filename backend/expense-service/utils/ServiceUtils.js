class ServiceUtils {
    constructor() { }

    static getFunctions() {
        return Object.freeze({
            capitalizeFirstLetters: Converters.capitalizeFirstLetters,
            generateRandomNumber: Generators.generateRandomNumber
        })
    }

}

class Converters {
    constructor() { }

    static capitalizeFirstLetters({str, withSpace = false, skipFirst = false}) {
        let regex;
        skipFirst ? regex = /( )([^ ]?)/g : regex = /( |^)([^ ]?)/g;
        return str.replace(regex, function (_, prep, letter) {
            return (prep && withSpace ? ' ' : '') + letter.toUpperCase();
        });
    };
}

class Generators {
    constructor() { }
    static generateRandomNumber() {
        return Date.now() + '-' + Math.round(Math.random() * 1E9);
    }
}

module.exports = ServiceUtils;
