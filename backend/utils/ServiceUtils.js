class ServiceUtils {
    constructor() {}
    
    static getFunctions() {
        return Object.freeze({
            convertToCammelCase: Converters.convertToCammelCase,
        })
    }
  
}

class Converters {
    constructor() {}

    static convertToCammelCase(stringInput){
        const words = stringInput.trim().split(' ');
        console.log(words);
        return words.map((word) => word.toLowerCase().replace(word[0], word[0].toUpperCase())).join(' ');
    };
}

console.log(Converters.convertToCammelCase('Saumya Dixit saasdas'));

module.exports = ServiceUtils;
  