module.exports = function makeOauthHandler({
    getGoogleOauthToken,
    oauthConfig,
    googleOauthOptionsConfig,
    googleOauthTokenConfig
}) {
    return async function oauthHandler({ code }) {
        try {
            const url = oauthConfig.tokenBaseUrl;
            const query = {
                code,
                client_id: googleOauthOptionsConfig.clientId,
                client_secret: googleOauthOptionsConfig.clientSecret,
                redirect_url: googleOauthOptionsConfig.redirect_url,
                ...googleOauthTokenConfig
            };
            const {id_token, access_token} = await getGoogleOauthToken({url, query});
            console.log({id_token, access_token})
            return true
        } catch (error) {
            console.log(error);
            const message = getErrorMessage('EX-00004') || '' + error.message;
            throw new ValidationError('EX-00004', message);
        }
    }
}