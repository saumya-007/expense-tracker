class AuthorizationFailed extends Error {
  constructor(errorCode, message, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthorizationFailed);
    }

    this.name = 'AuthorizationFailed';
    this.httpStatusCode = 401;
    this.date = new Date();
    this.errorCode = errorCode ? errorCode : 'EX-00001';
    this.message = message ? message : 'Something went wrong';
  }
}
module.exports = AuthorizationFailed;
