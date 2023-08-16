const EXPENSE_TABLE_NAME = 'user_expenses';
const CATEGORY_TABLE_NAME = 'expense_category';
const SPEND_LIMIT = 'spend_limit';

function makeExpenseDb({ database, cockroach, UnknownError }) {

  return Object.freeze({
    addExpense,
    getCategoryByName,
    getCategoryById,
    addCategory,
    getUserExpense,
    deleteUserExpense,
    updateUserExpense,
    getExpenseById,
    getSpendLimitForSpentOn,
    getAllSpendLimit,
    getSpendLimitById,
    deleteSpendLimit,
    addSpendLimit,
    updateSpendLimit,
    updateIsSpendLimitChangedFlag,
    getAllSpendLimitExpectOne,
    getTotalAmountAgainstSpendLimit,
    getUserExpenseByCategory,
    getAllCategories,
  });


  async function addExpense({
    activity,
    categoryId,
    amount,
    userId,
    spentOn,
    spendLimit
  }) {
    try {
      const fields = [
        'activity',
        'category_id',
        'amount',
        'user_id',
        'created_at',
        'created_by',
        'modified_at',
        'modified_by',
        'spent_on',
        'spend_limit'
      ]
      const values = [
        activity,
        categoryId,
        amount,
        userId,
        new Date(),
        userId,
        new Date(),
        userId,
        spentOn,
        spendLimit
      ];

      const query = `
                      INSERT INTO
                        ${EXPENSE_TABLE_NAME}
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
      console.error('makeExpenseDb : addExpense');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getCategoryByName({
    categoryName,
    fieldsToQuery,
  }) {
    try {
      const values = [
        categoryName
      ];
      const query = `
                  SELECT 
                    ${fieldsToQuery ? fieldsToQuery : '*'}
                  FROM
                    ${CATEGORY_TABLE_NAME}
                  WHERE
                    category_name = $1;
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
      console.error('makeExpenseDb : getCategoryByName');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getCategoryById({
    categoryId,
    fieldsToQuery,
  }) {
    try {
      const values = [
        categoryId
      ];
      const query = `
                  SELECT 
                    ${fieldsToQuery ? fieldsToQuery : '*'}
                  FROM
                    ${CATEGORY_TABLE_NAME}
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
      console.error('makeExpenseDb : getCategoryById');
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
      const values = [
        categoryName,
        userId,
        new Date(),
        userId,
        new Date()
      ];
      const query = `
                  INSERT INTO 
                    ${CATEGORY_TABLE_NAME}
                  (${fields})
                    VALUES
                  (${values.map((_, index) => '$' + (index + 1))})
                  RETURNING
                    id;
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
      console.error('makeExpenseDb : addCategory');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getUserExpense({
    userId,
    expenseId,
    startDate,
    endDate,
    fieldsToQuery,
  }) {
    try {
      const values = [
        userId
      ];
      const fields = fieldsToQuery ? fieldsToQuery : [
        'id',
        'activity',
        'category_name',
        'amount',
        'spent_on',
        'is_spent_limit_changed',
        'spend_limit'
      ]

      if (expenseId) {
        fields.push('category_id');
        values.push(expenseId);
      }

      const query = `
                    SELECT 
                      ${fields.map(field => {
                        if (field === 'category_name') return `cat.${field}`
                        else if (field === 'spend_limit') return `sl.${field}, ex.spend_limit as spend_limit_id`
                        else  return `ex.${field}`
                      })}
                    FROM
                      ${EXPENSE_TABLE_NAME} ex
                    LEFT JOIN
                      ${CATEGORY_TABLE_NAME} cat
                    ON 
                      ex.category_id = cat.id
                    LEFT JOIN 
                      ${SPEND_LIMIT} sl
                    ON 
                      ex.spend_limit = sl.id
                    WHERE
                      ex.user_id = $1
                    ${startDate && endDate ? 
                      `AND spent_on BETWEEN '${startDate}' AND '${endDate}'`
                      :
                      ''
                    }
                    ${expenseId ?
                    `AND
                      ex.id = $2
                    `:
                    ''
        };
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return expenseId ? false : [];
      }
      return expenseId ? result.rows[0] : result.rows;
    } catch (e) {
      console.error('makeExpenseDb : getUserExpense');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getUserExpenseByCategory({
    userId,
    startDate,
    endDate,
  }) {
    try {
      const values = [
        userId,
        startDate,
        endDate,
      ];

      const query = `
                  SELECT 
                    sum(ex.amount), cat.category_name
                  FROM
                    ${EXPENSE_TABLE_NAME} ex
                  LEFT JOIN 
                    ${SPEND_LIMIT} sl
                  ON 
                    ex.spend_limit = sl.id
                  LEFT JOIN
                    ${CATEGORY_TABLE_NAME} cat
                  ON
                    ex.category_id = cat.id
                  WHERE
                    ex.user_id = $1
                  AND
                    ex.spent_on BETWEEN $2 AND $3
                  GROUP BY cat.category_name
                    `;
      console.log(values);
      console.log(query);
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows;
    } catch (e) {
      console.error('makeExpenseDb : getUserExpense');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getAllCategories({
    userId,
    startDate, 
    endDate,
  }) {
    try {
      const values = [
        userId,
      ];
      startDate && endDate ? values.push(startDate, endDate) : null;

      const query = `
                  SELECT DISTINCT
                    cat.category_name
                  FROM
                    ${EXPENSE_TABLE_NAME} ex
                  LEFT JOIN 
                    ${SPEND_LIMIT} sl
                  ON 
                    ex.spend_limit = sl.id
                  LEFT JOIN
                    ${CATEGORY_TABLE_NAME} cat
                  ON
                    ex.category_id = cat.id
                  WHERE
                    ex.user_id = $1
                  ${startDate && endDate ? 'AND ex.spent_on BETWEEN $2 AND $3' : ''}
                    `;
      console.log(query, values)
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows.map(item => item.category_name);
    } catch (e) {
      console.error('makeExpenseDb : getAllCategories');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getTotalAmountAgainstSpendLimit({
    userId,
  }) {
    try {
      const values = [
        userId,
      ];

      const query = `
                    SELECT 
                      sum(ex.amount), sl.spend_limit as spent_limit_amount, sl.id
                    FROM
                      ${EXPENSE_TABLE_NAME} ex
                    LEFT JOIN 
                      ${SPEND_LIMIT} sl
                    ON 
                      ex.spend_limit = sl.id
                    WHERE
                      ex.user_id = $1
                    GROUP BY sl.id
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows;
    } catch (e) {
      console.error('makeExpenseDb : getTotalAmountAgainstSpendLimit');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function deleteUserExpense({
    expenseId,
  }) {
    try {
      const values = [
        expenseId
      ];
      const query = `
                    DELETE 
                      FROM
                    ${EXPENSE_TABLE_NAME}
                      WHERE
                    id = $1
                      RETURNING
                    id;
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows;
    } catch (e) {
      console.error('makeExpenseDb : deleteUserExpense');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function updateUserExpense({
    expenseId,
    activity,
    categoryId,
    amount,
    spentOn,
    userId,
    isSpentLimitChanged
  }) {
    try {
      const values = [
        expenseId,
        activity,
        categoryId,
        amount,
        spentOn,
        userId,
        new Date(),
        isSpentLimitChanged
      ];
      const fields = [
        'activity',
        'category_id',
        'amount',
        'spent_on',
        'modified_by',
        'modified_at',
        'is_spent_limit_changed'
      ]
      const query = `
                    UPDATE 
                      ${EXPENSE_TABLE_NAME}
                    SET
                      ${fields.map((field, index) => `${field} = $${index + 2}`)}
                    WHERE
                      id = $1
                    RETURNING
                      id;
                    `;
      console.log(values)
      console.log(query)
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
      console.error('makeExpenseDb : updateUserExpense');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getExpenseById({
    expenseId,
    fieldsToQuery,
  }) {
    try {
      const values = [expenseId];
      const query = `
                    SELECT
                      ${fieldsToQuery ? fieldsToQuery : '*'}
                    FROM
                      ${EXPENSE_TABLE_NAME}
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
      console.error('makeExpenseDb : getExpenseById');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getSpendLimitForSpentOn({
    spentOn,
    fieldsToQuery
  }) {
    try {
      const values = [spentOn];
      const query = `
                    SELECT
                      ${fieldsToQuery ? fieldsToQuery : 'id'}
                    FROM
                      ${SPEND_LIMIT}
                    WHERE
                      $1 >= start_date
                    AND 
                      $1 <= end_date;
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });

      // Rage is not allowed to overlap hence only one record must be found.
      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeExpenseDb : getSpendLimitForSpentOn');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getAllSpendLimit({
    userId,
    fieldsToQuery
  }) {
    try {
      const values = [userId];
      const query = `
                    SELECT
                      ${fieldsToQuery ? fieldsToQuery : '*'}
                    FROM
                      ${SPEND_LIMIT}
                    WHERE
                      user_id = $1;
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows;
    } catch (e) {
      console.error('makeExpenseDb : getAllSpendLimit');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getAllSpendLimitExpectOne({
    userId,
    spendLimitId,
    fieldsToQuery
  }) {
    try {
      const values = [userId, spendLimitId];
      const query = `
                    SELECT
                      ${fieldsToQuery ? fieldsToQuery : '*'}
                    FROM
                      ${SPEND_LIMIT}
                    WHERE
                      user_id = $1
                    AND
                      id <> $2;
                    `;
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      if (!result || !result.rows || !result.rows.length) {
        return [];
      }
      return result.rows;
    } catch (e) {
      console.error('makeExpenseDb : getAllSpendLimitExpectOne');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function getSpendLimitById({
    spendLimitId,
    fieldsToQuery
  }) {
    try {
      const values = [spendLimitId];
      const query = `
                    SELECT
                      ${fieldsToQuery ? fieldsToQuery : '*'}
                    FROM
                      ${SPEND_LIMIT}
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
      console.error('makeExpenseDb : getSpendLimitById');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function deleteSpendLimit({
    spendLimitId,
  }) {
    try {
      const values = [spendLimitId];
      const query = `
                    DELETE 
                      FROM
                    ${SPEND_LIMIT}
                      WHERE
                    id = $1
                      RETURNING
                    id;
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
      console.error('makeExpenseDb : deleteSpendLimit');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function addSpendLimit({
    spendLimit, startDate, endDate, userId
  }) {
    try {
      const fields = ['spend_limit', 'start_date', 'end_date', 'user_id'];
      const values = [spendLimit, startDate, endDate, userId];
      const query = `
                  INSERT INTO 
                    ${SPEND_LIMIT}
                  (${fields})
                    VALUES
                  (${values.map((_, index) => '$' + (index + 1))})
                  RETURNING
                    id;
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
      console.error('makeExpenseDb : addCategory');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function updateSpendLimit({
    spendLimitId, spendLimit, startDate, endDate
  }) {
    try {
      const fields = ['spend_limit', 'start_date', 'end_date'];
      const values = [spendLimitId, spendLimit, startDate, endDate];
      const query = `
                    UPDATE 
                      ${SPEND_LIMIT}
                    SET
                      ${fields.map((field, index) => `${field} = $${index + 2}`)}
                    WHERE
                      id = $1
                    RETURNING
                      id;
                    `;
                    console.log(values);
                    console.log(query);
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      console.log(result);
      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeExpenseDb : UpdateSpendLimit');
      console.error(e);
      throw new UnknownError();
    }
  }

  async function updateIsSpendLimitChangedFlag({
    spendLimitId, isSpentLimitChanged
  }) {
    try {
      const fields = ['is_spent_limit_changed'];
      const values = [spendLimitId, isSpentLimitChanged];
      const query = `
                    UPDATE 
                      ${EXPENSE_TABLE_NAME}
                    SET
                      ${fields.map((field, index) => `${field} = $${index + 2}`)}
                    WHERE
                      spend_limit = $1
                    RETURNING
                      id;
                    `;
                    console.log(values);
                    console.log(query);
      const result = await cockroach.executeQuery({
        database,
        query,
        values,
      });
      console.log(result);
      if (!result || !result.rows || !result.rows.length) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.error('makeExpenseDb : updateIsSpendLimitChangedFlag');
      console.error(e);
      throw new UnknownError();
    }
  }
}
module.exports = makeExpenseDb;
