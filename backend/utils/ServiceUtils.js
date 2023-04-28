class ServiceUtils {
    constructor() {}
    
    static getFunctions() {

        const converter = new Converters()

        return Object.freeze({
            convertToCammelCase: converter.convertToCammelCase,
        })
    }
  
}

class Converters {
    constructor() {}

    static convertToCammelCase(stringInput){
        return stringInput.toLowerCase().replace(stringInput[0], stringInput[0].toUpperCase());
    };
}
  
module.exports = ServiceUtils;
  