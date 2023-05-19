module.exports = function makeUpdateUser({
    userdb,
    Joi,
    getErrorMessage,
    getUserByEmail,
    ValidationError,
  }) {
    return async function updateUser({
      email,
      name,
      first_name,
      last_name,
      profile_photo_url,
      password,
    }) {
  
      console.log(`
        @ email: ${email},
        @ name: ${name},
        @ first_name: ${first_name},
        @ last_name: ${last_name},
        @ profile_photo_url: ${profile_photo_url},
        @ password : ${password}
      `)
  
      /**
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
  
      const userDetails = await getUserByEmail({ email });

      if (!userDetails) {
        const message = getErrorMessage('EX-00003') || '' + error.message;
        throw new ValidationError('EX-00003', message);
      }
      
      email = email ? email : userDetails['email'];
      name = name  ? name : userDetails['name'];
      first_name = first_name ? first_name : userDetails['first_name'];
      last_name = last_name ? last_name : userDetails['last_name'];
      profile_photo_url = profile_photo_url ? profile_photo_url : userDetails['profile_photo_url'];
      password = password ? password : userDetails['password'];

      return await userdb.updateUser({
        email,
        name,
        first_name,
        last_name,
        profile_photo_url,
        password,
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
        name: Joi.string().required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        profile_photo_url: Joi.string().regex(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/g),
        password : Joi.string().regex(),
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
        const message = getErrorMessage('EX-00001') || '' + error.message;
        throw new ValidationError('EX-00001', message);
      }
    }
  };
  