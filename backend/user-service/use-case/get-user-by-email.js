module.exports = function makegetUserByEmail({
    userdb,
    Joi,
    getErrorMessage,
    userTableFields,
    ValidationError,
}) {
    return async function getUserByEmail({ email }) {

        console.log(`
            @ email: ${email},
        `)

        validateUserData({ email });

        return await userdb.getUserByEmail({
            email,
            fieldsToQuery: userTableFields,
        });
    }

    function validateUserData({ email }) {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        const { error } = schema.validate({ email });
        if (error) {
            const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
            throw new ValidationError('ER-00001', message);
        }
    }
}