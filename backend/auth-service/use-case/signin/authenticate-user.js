module.exports = function makeAuthenticateUser({
    Joi,
    getUserByEmail,
    addAccessToken,
    decryptData,
    getErrorMessage,
    ValidationError,
}) {
    return async function authenticateUser({ email, password }) {
        console.log(`
        @ email: ${email}
        @ password: ${password}
        `)

        validateInput({ email, password });
        const userDetails = await getUserByEmail({ email });
        if (!userDetails) {
            throw new ValidationError('ER-00010', getErrorMessage('ER-00010'));
        }
        const storedPassword = decryptData(JSON.parse(userDetails['password']));
        if (storedPassword !== password) {
            throw new ValidationError('ER-00011', getErrorMessage('ER-00011'));
        }

        return await addAccessToken({ userId: userDetails['id'] });
    }

    function validateInput({ email, password }) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            // add regex
        });
        const { error } = schema.validate({ email, password });
        if (error) {
            const message = [(getErrorMessage('ER-00012') || ''), error.message].join(', ');
            throw new ValidationError('ER-00012', message);
        }
    }
}