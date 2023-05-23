module.exports = function makeVerifyAccessToken({
    Joi,
    jwt,
    getAccessTokenById,
    tokenKey,
    decryptData,
    getErrorMessage,
    ForbiddenError,
    ValidationError
}) {
    return async function verifyAccessToken({
        acccessToken,
        tokenId
    }) {
        try {
            validateTokenId({ tokenId })
            const { access_token, ttl } = await getAccessTokenById({ tokenId });
            // return decryptData(JSON.parse(access_token));
            return jwt.verify(acccessToken, tokenKey);
        } catch (error) {
            const message = [(getErrorMessage('ER-00009') || ''), error.message].join(', ');
            throw new ForbiddenError('ER-00009', message);
        }
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