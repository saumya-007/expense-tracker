module.exports = function makeOauthHandlerAction({
    oauthHandler,
    formatResponse,
    formatError,
}) {
    return async function oauthHandlerAction(httpRequest) {
        try {
            const code = httpRequest.query.code;
            const response = await oauthHandler({code});
            return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}