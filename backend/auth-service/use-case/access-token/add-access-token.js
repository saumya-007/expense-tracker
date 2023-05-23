module.exports = function makeAddAccessToken({
    Joi,
    jwt,
    authdb,
    defaultTTL,
    convertToMilliseconds,
    tokenKey,
    encryptData,
    getErrorMessage,
    getUserById,
    ValidationError
}) {
    return async function addAccessToken({
        userId,
    }) {
        console.log(`
        @ userId: ${userId},
      `)
        validateUserData({ userId });
        const userDetails = await getUserById({ userId });

        if (!userDetails) {
            throw new ValidationError('ER-00002', getErrorMessage('ER-00002'));
        }

        const accessToken = generateAccessToken({ defaultTTL, jwt, userDetails });

        const { iv, encryptedData, key } = encryptData({ originalData: accessToken });

        const token = await authdb.addAccessToken({
            accessToken: JSON.stringify({ iv, encryptedData, key }),
            userId,
            ttl: new Date(Date.now() + convertToMilliseconds({ timeString: defaultTTL })),
        })

        return { accessToken, tokenId: token['id'] };
    };

    function validateUserData({
        userId,
    }) {

        const schema = Joi.object({
            userId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({
            userId
        });
        if (error) {
            const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
            throw new ValidationError('ER-00001', message);
        }
    }

    function generateAccessToken({ defaultTTL, jwt, userDetails }) {
        return jwt.sign(userDetails, tokenKey, {
            expiresIn: defaultTTL
        })
    }
};
