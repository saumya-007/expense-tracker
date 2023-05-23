module.exports = function makeAuthenticateUserAction({
  authenticateUser,
  formatResponse,
  formatError,
}) {
  return async function authenticateUserAction(httpRequest) {
    try {
      const email = httpRequest.body.email;
      const password = httpRequest.body.password;
      const response = await authenticateUser({ email, password });
      return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};