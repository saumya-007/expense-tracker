const accessTokenControllers = require('./access-token');
const signUpControllers = require('./signup');
const signinControllers = require('./signin')

module.exports = Object.freeze({
    ...accessTokenControllers,
    ...signUpControllers,
    ...signinControllers
})