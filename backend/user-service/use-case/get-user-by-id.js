module.exports = function makegetUserById({
    userdb,
    Joi,
    getErrorMessage,
    userTableFields,
    ValidationError,
}) {
    return async function getUserById({ userId }) {

        console.log(`
            @ userId: ${userId},
        `)

        validateUserData({ userId });

        return await userdb.getUserById({
            userId,
            fieldsToQuery: userTableFields,
        });
    }

    function validateUserData({ userId }) {
        const schema = Joi.object({
            userId: Joi.string().guid().required()
        });
        const { error } = schema.validate({ userId });
        if (error) {
            const message = [(getErrorMessage('ER-00004') || ''), error.message].join(', ');
            throw new ValidationError('ER-00004', message);
        }
    }
}