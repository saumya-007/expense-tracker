const EXPENSE_TABLE_NAME = 'user_expenses';
const CATEGORY_TABLE_NAME = 'expense_category'

function makeExpenseDb({ database, cockroach, UnknownError }) {

  return Object.freeze({
    addUserExpenses,
    getCategoryByName,
    addCategory,
  });

  // user expense table
  async function addUserExpenses({ fields, fieldValues }) {
    try {
      const values = [];
      const query = `
                      INSERT INTO
                        ${EXPENSE_TABLE_NAME}
                            (${fields})
                      VALUES 
                          ${fieldValues.map(
                            (fields) =>
                              `(${fields.map((values) => `'${values}'`)})`
                          )}`;
      // console.log(query);
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });

      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result;
    } catch (e) {
      console.error('makeExpenseDb : addUserExpenses');
      console.error(e);
      throw new UnknownError();
    }
  }

  // category table
  async function getCategoryByName({
    categoryName,
    fieldsToQuery,
  }) {
    try {
      const values = [categoryName];
      const query = `
                  SELECT 
                    ${fieldsToQuery}
                  FROM
                    ${CATEGORY_TABLE_NAME}
                  WHERE
                    category_name = $1;
                  `;
      console.log(query);
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });

      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result;
    } catch (e) {
      console.error('makeExpenseDb : getCategoryByName');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function addCategory({
    categoryName,
    userId,
  }) {
    try {
      const fields = [
        'category_name',
        'created_by',
        'created_at',
        'modified_by',
        'modified_at',
      ];
      const values = [categoryName, userId, new Date(), userId, new Date()];
      const query = `
                  INSERT INTO 
                    ${CATEGORY_TABLE_NAME}
                  (${fields})
                    VALUES
                  (${values.map((_, index) => '$'+index+1)})
                  RETURNING
                    id;
                  `;
      console.log(query);
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });

      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result[0];
    } catch (e) {
      console.error('makeExpenseDb : getCategoryByName');
      console.error(e);
      throw new UnknownError();
    }
  }
}

module.exports = makeExpenseDb;
