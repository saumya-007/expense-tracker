module.exports = function makeGetOauthLinkAction({
  getOauthLink,
  formatResponse,
  formatError,
}) {
  return async function getOauthLinkAction(httpRequest) {
    try {
      // do i need to see if users is logged in ?
      const response = await getOauthLink();
      return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
