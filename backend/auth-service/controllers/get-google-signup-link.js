module.exports = function makegetGoogleSignUpLinkAction({
  getGoogleSignUpLink,
  formatResponse,
  formatError,
}) {
  return async function getGoogleSignUpLinkAction(httpRequest) {
    try {
      // do i need to see if users is logged in ?
      const response = await getGoogleSignUpLink();
      return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
