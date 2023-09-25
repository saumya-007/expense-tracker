module.exports = function makeOauthHandlerAction({
    oauthHandler,
    formatHtmlResponse,
    formatError,
}) {
    return async function oauthHandlerAction(httpRequest) {
        try {
            const code = httpRequest.query.code;
            const response = await oauthHandler({code});
            return formatHtmlResponse({htmlContent: response, statusCode: 200});
        } catch (error) {
            console.error(error);
            return formatError({ error });
        }
    }
}