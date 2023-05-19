const USER_TABLE_NAME = 'user_details';

function makeuserdb({ database, cockroach, UnknownError }) {

  return Object.freeze({
    addUser,
    getUserByEmail,
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

  async function getUserByEmail({
    email,
    fieldsToQuery,
  }) {
    try {
      const values = [
        email
      ];
      const query = `
                  SELECT 
                    ${fieldsToQuery}
                  FROM
                    ${USER_TABLE_NAME}
                  WHERE
                    email = $1;
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
}

module.exports = makeuserdb;
