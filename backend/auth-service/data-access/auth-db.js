const TABLE_NAME = 'access_tokens';

module.exports = function makeAuthDb({ database, cockroach, UnknownError }) {
    return Object.freeze({
        addAccessToken,
        getAccessTokenByUserId,
        deleteAccessToken,
        getAccessTokenById,
    });

    async function addAccessToken({
        accessToken,
        userId,
        ttl,
    }) {
        try {
            const fields = [
                'access_token',
                'user_id',
                'ttl',
                'created_at',
            ]
            const values = [
                accessToken,
                userId,
                ttl,
                new Date(),
            ];
            const query = `
                      INSERT INTO
                        ${TABLE_NAME}
                            (${fields})
                      VALUES 
                          (${values.map((_, index) => `$${index + 1}`)})
                      RETURNING id;
                        `;
            console.log(query);
            console.log(values);
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
            console.error('makeAccesstokenDb : addAccessToken');
            console.error(e);
            throw new UnknownError();
        }
    }

    async function getAccessTokenByUserId({
        fieldsToQuery,
        userId
    }) {
        try {
            const values = [
                userId
            ];
            const query = `
                    SELECT    
                        ${fieldsToQuery ? fieldsToQuery : 'access_token, ttl'}
                    FROM
                        ${TABLE_NAME}
                    WHERE
                        user_id = $1;                       
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
            console.error('makeAccesstokenDb : getAccessTokenByUserId');
            console.error(e);
            throw new UnknownError();
        }
    }

    async function deleteAccessToken({
        userId
    }) {
        try {
            const values = [
                userId
            ];
            const query = `
                    DELETE    
                        FROM
                    ${TABLE_NAME}
                        WHERE
                    id = $1;`;
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
            console.error('makeAccesstokenDb : deleteAccessToken');
            console.error(e);
            throw new UnknownError();
        }
    }

    async function getAccessTokenById({
        fieldsToQuery,
        tokenId
    }) {
        try {
            const values = [tokenId];
            const query = `
                    SELECT    
                        ${fieldsToQuery ? fieldsToQuery : 'access_token, ttl'}
                    FROM
                        ${TABLE_NAME}
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
            console.error('makeAccesstokenDb : getAccessTokenByUserId');
            console.error(e);
            throw new UnknownError();
        }
    }
}