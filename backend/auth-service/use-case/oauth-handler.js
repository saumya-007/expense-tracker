module.exports = function makeOauthHandler({
    jwt,
    getGoogleAccessToken,
    getGoogleUser,
    addUser,
    oauthConfig,
    googleOauthTokenConfig,
    getErrorMessage,
    ValidationError,
}) {
    return async function oauthHandler({ code }) {
        try {
            const tokenUrl = oauthConfig.tokenBaseUrl;
            const tokenOptions = {
                code,
                client_id: oauthConfig.clientId,
                client_secret: oauthConfig.clientSecret,
                redirect_uri: oauthConfig.redirectUrl,
                ...googleOauthTokenConfig,
            };
            const { id_token, access_token } = await getGoogleAccessToken({
                url: tokenUrl,
                options: tokenOptions
            });

            /** Alternative to what is done below
             * 
            const userInfoUrl = oauthConfig.userInfoUrl
            const userInfoOptions = {
                alt: 'json',
                access_token: `${access_token}`
            }
            const userInfo = await getGoogleUser({
                id_token,
                url: userInfoUrl,
                options: userInfoOptions
            })
             * Need to enable url rewritting on the system : https://www.digitalocean.com/community/tutorials/how-to-rewrite-urls-with-mod_rewrite-for-apache-on-ubuntu-20-04
             * For now just using jwt to get email and names
             */
            const {
                email,
                email_verified,
                name,
                given_name,
                family_name,
                picture,
            } = jwt.decode(id_token);

            if (!email_verified) {
                const message = getErrorMessage('EX-00005') || '' + error.message;
                throw new ValidationError('EX-00005', message);
            }

            return ({
                email,
                name,
                first_name: given_name,
                last_name: family_name,
                profile_photo_url: picture,
              });

            // return true;
        } catch (error) {
            console.log(error);
            const message = getErrorMessage('EX-00001') || '' + error.message;
            throw new ValidationError('EX-00001', message);
        }
    }
}