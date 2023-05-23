module.exports = function makeUpdateUser({
  userdb,
  Joi,
  getErrorMessage,
  encryptData,
  getUserById,
  ValidationError,
}) {
  return async function updateUser({
    userId,
    email,
    name,
    first_name,
    last_name,
    profile_photo_url,
    password,
  }) {

    console.log(`
        @ userId: ${userId},
        @ email: ${email},
        @ name: ${name},
        @ first_name: ${first_name},
        @ last_name: ${last_name},
        @ profile_photo_url: ${profile_photo_url},
        @ password : ${password}
      `)

    /**
     * Also store password hash dont store passwords in plan text use crypto library
     * Need to do something about about updating profile photo
     */

    validateUserData({
      email,
      name,
      first_name,
      last_name,
      profile_photo_url,
      password,
    });

    const userDetails = await getUserById({ userId });

    if (!userDetails) {
      throw new ValidationError('ER-00003', getErrorMessage('ER-00003'));
    }

    email = email ? email : userDetails['email'];
    name = name ? name : userDetails['name'];
    first_name = first_name ? first_name : userDetails['first_name'];
    last_name = last_name ? last_name : userDetails['last_name'];
    profile_photo_url = profile_photo_url ? profile_photo_url : userDetails['profile_photo_url'];
    password = password ? encryptData({ originalData: password }) : userDetails['password'];

    return await userdb.updateUser({
      email,
      name,
      first_name,
      last_name,
      profile_photo_url,
      password: JSON.stringify(password),
      userId
    })
  };

  function validateUserData({
    email,
    name,
    first_name,
    last_name,
    profile_photo_url,
    password,
  }) {

    const schema = Joi.object({
      email: Joi.string().email(),
      name: Joi.string(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      profile_photo_url: Joi.string(),
      password: Joi.string(),
      // profile_photo_url: Joi.string().regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/).allow(undefined),
      // password: Joi.string().regex(),
    });
    const { error } = schema.validate({
      email,
      name,
      first_name,
      last_name,
      profile_photo_url,
      password,
    });
    if (error) {
      console.log(error);
      const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
      throw new ValidationError('ER-00001', message);
    }
  }
};
