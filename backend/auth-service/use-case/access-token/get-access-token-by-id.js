module.exports = function makeGetAccessTokenById({
    Joi,
    authdb,
    getErrorMessage,
    ValidationError
}) {
    return async function getAccessTokenById({
        tokenId
    }) {
        console.log(`
        @ tokenId: ${tokenId}
        `);
        validateTokenId({ tokenId })
        return await authdb.getAccessTokenById({ tokenId });
    }

    function validateTokenId({
        tokenId,
    }) {

        const schema = Joi.object({
            tokenId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({
            tokenId
        });
        if (error) {
            const message = [(getErrorMessage('ER-00013') || ''), error.message].join(', ');
            throw new ValidationError('ER-00013', message);
        }
    }
}