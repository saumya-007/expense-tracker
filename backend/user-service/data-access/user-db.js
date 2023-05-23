const USER_TABLE_NAME = 'user_details';

function makeuserdb({ database, cockroach, UnknownError }) {

  return Object.freeze({
    addUser,
    getUserByEmail,
    updateUser,
    getUserById,
  });

  async function addUser({
    email,
    name,
    first_name,
    last_name,
    profile_photo_url,
  }) {
    try {
      const fields = [
        'email',
        'name',
        'first_name',
        'last_name',
        'profile_photo_url',
        'created_at',
        'modified_at',
      ]
      const values = [
        email,
        name,
        first_name,
        last_name,
        profile_photo_url,
        new Date(),
        new Date(),
      ];

      const query = `
                  INSERT INTO
                    ${USER_TABLE_NAME}
                        (${fields})
                  VALUES 
                      (${values.map((_, index) => `$${index + 1}`)})
                  RETURNING id;
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });

      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeuserdb : addUser');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function updateUser({
    email,
    name,
    first_name,
    last_name,
    profile_photo_url,
    password,
    userId,
  }) {
    try {
      const fields = [
        'email',
        'name',
        'first_name',
        'last_name',
        'profile_photo_url',
        'modified_at',
        'password'
      ]
      const values = [
        email,
        name,
        first_name,
        last_name,
        profile_photo_url,
        new Date(),
        password,
        userId
      ];
      console.log(values);

      const query = `
                  UPDATE
                    ${USER_TABLE_NAME}
                  SET
                    ${fields.map((field, index) => `${field} = $${index + 1}`)}
                  WHERE
                    id = $${values.length}
                  RETURNING id`;
      console.log(query)
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });

      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeuserdb : updateUser');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getUserByEmail({
    email,
    fieldsToQuery,
  }) {
    try {
      const values = [email, true];
      const query = `
                  SELECT 
                    ${fieldsToQuery}
                  FROM
                    ${USER_TABLE_NAME}
                  WHERE
                    email = $1
                  AND
                    is_registered = $2;
                  `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeuserdb : getUserByEmail');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getUserById({
    userId,
    fieldsToQuery,
  }) {
    try {
      const values = [
        userId,
      ];
      const query = `
                  SELECT 
                    ${fieldsToQuery}
                  FROM
                    ${USER_TABLE_NAME}
                  WHERE
                    id = $1;
                  `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeuserdb : getUserById');
      console.error(e);
      throw new UnknownError();
    }
  }

}

module.exports = makeuserdb;
