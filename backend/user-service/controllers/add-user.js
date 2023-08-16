module.exports = function makeAddUserAction({
  addUser,
  formatResponse,
  formatError,
}) {
  return async function adduserAction(httpRequest) {
    try {
      const email = httpRequest.body.email;
      const name = httpRequest.body.name;
      const first_name = httpRequest.body.first_name;
      const last_name = httpRequest.body.last_name;
      const profile_photo_url = httpRequest.body.profile_photo_url;

      const response = await addUser({
        email,
        name,
        first_name,
        last_name,
        profile_photo_url,
      });
      return formatResponse({ contentType: 'application/json', statusCode: 201 , body: { item: response }});
    } catch (error) {
      console.error(error);
      return formatError({ error });
    }
  };
};
