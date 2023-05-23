module.exports = function makegetUserByEmail({
    userdb,
    Joi,
    getErrorMessage,
    userTableFields,
    ValidationError,
}) {
    return async function getUserByEmail({ email, isAuthServiceCall }) {

        console.log(`
            @ email: ${email},
            @ isAuthServiceCall" ${isAuthServiceCall}
        `)

        validateUserData({ email, isAuthServiceCall });

        return await userdb.getUserByEmail({
            email,
            fieldsToQuery: isAuthServiceCall ? [ 'password' , ...userTableFields]:  userTableFields,
        });
    }

    function validateUserData({ email, isAuthServiceCall }) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            isAuthServiceCall: Joi.boolean(),
        });
        const { error } = schema.validate({ email, isAuthServiceCall });
        if (error) {
            const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
            throw new ValidationError('ER-00001', message);
        }
    }
}