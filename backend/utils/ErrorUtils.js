class ErrorUtils {
  constructor({ errors }) {
    this.errors = errors;
  }

  getErrorMessageFromCode(errorCode){
    return this.errors[`${errorCode}`] ? this.errors[`${errorCode}`] : 'Something went wrong';
};
}

module.exports = ErrorUtils;
