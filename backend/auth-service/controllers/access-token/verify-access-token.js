module.exports = function makeVerifyAccessTokenAction({
    verifyAccessToken,
    formatResponse,
    formatError,
  }) {
    return async function verifyAccessTokenAction(httpRequest) {
        try {
          const acccessToken = httpRequest.body.accessToken;
          const tokenId = httpRequest.body.tokenId;
          const response = await verifyAccessToken({ acccessToken, tokenId });
          return formatResponse({ contentType: 'application/json', statusCode: 200, body: { item: response } });
        } catch (error) {
          console.error(error);
          return formatError({ error });
        }
      };
  }