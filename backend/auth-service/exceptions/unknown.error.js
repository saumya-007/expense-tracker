class UnknownError extends Error {
  constructor(errorCode, message, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownError);
    }

    this.name = 'UnknownError';
    this.httpStatusCode = 500;
    this.date = new Date();
    this.errorCode = errorCode ? errorCode : 'EX-00005';
    this.message = message ? message : 'Something went wrong';
  }
}
module.exports = UnknownError;
