module.exports = function makeAddUser({
  userdb,
  Joi,
  capitalizeFirstLetters,
  getErrorMessage,
  getUserByEmail,
  ValidationError,
}) {
  return async function addUser({
    email,
    name,
    first_name,
    last_name,
    profile_photo_url,
  }) {

    console.log(`
      @ email: ${email},
      @ name: ${name},
      @ first_name: ${first_name},
      @ last_name: ${last_name},
      @ profile_photo_url: ${profile_photo_url},
    `)

    validateUserData({
      email,
      name,
      first_name,
      last_name,
      profile_photo_url,
    });

    if (!first_name || !last_name) {
      const [ firstName, lastName ] = capitalizeFirstLetters({str: name.trim(), withSpace: true, skipFirst: false }).split(' ');
      if (!first_name) first_name = firstName;
      if (!last_name) last_name = lastName;
    }

    const userDetails = await getUserByEmail({ email });
    
    if (userDetails) {
      throw new ValidationError('ER-00002', getErrorMessage('ER-00002'));
    }
    return await userdb.addUser({
      email,
      name: capitalizeFirstLetters({ str: name.trim(), withSpace: true, skipFirst: false }),
      first_name: capitalizeFirstLetters({ str: first_name?.trim(), withSpace: true, skipFirst: false }),
      last_name: capitalizeFirstLetters({ str: last_name?.trim(), withSpace: true, skipFirst: false }),
      profile_photo_url,
    })
  };

  function validateUserData({
    email,
    name,
    first_name,
    last_name,
    profile_photo_url,
  }) {

    const schema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      first_name: Joi.string().allow(null, '').required(),
      last_name: Joi.string().allow(null, '').required(),
      profile_photo_url: Joi.string().custom((value, helper) => {
        const urlRegEx = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/g;
        if (!urlRegEx.test(value)) helper.message = 'Url is invalid';
      }).required(),
    });
    const { error } = schema.validate({
      email,
      name,
      first_name,
      last_name,
      profile_photo_url,
    });
    if (error) {
      const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
      throw new ValidationError('ER-00001', message);
    }
  }
};
