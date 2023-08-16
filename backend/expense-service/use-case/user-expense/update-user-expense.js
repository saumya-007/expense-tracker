module.exports = function makeUpdateExpense({
    expensedb,
    Joi,
    getErrorMessage,
    capitalizeFirstLetters,
    ValidationError,
}) {
    return async function updateExpense({
        userId,
        expenseId,
        activity,
        amount,
        categoryName,
        spentOn
    }) {

        console.log(`
        @ userId: ${userId}
        @ expenseId: ${expenseId},
        @ activity: ${activity},
        @ amount: ${amount},
        @ categoryName: ${categoryName},
        @ spentOn: ${spentOn} 
      `)

        validateData({
            expenseId,
            activity,
            amount,
            categoryName,
            spentOn
        });

        const spendLimitDetails = await expensedb.getSpendLimitForSpentOn({ spentOn, fieldsToQuery:['id', 'spend_limit'] });

        if (!spendLimitDetails) {
        throw new ValidationError('ER-00012', getErrorMessage('ER-00012'));
        }

        /**
         > Getting all details from expense db joined with category db
         > If category name changes and if that category does not exist in db then add new category else take that id and update it in expense db
         */
        const userExpenses = await expensedb.getUserExpense({ userId, expenseId });
        console.log(spendLimitDetails)
        expenseId = expenseId ? expenseId : userExpenses.expenseId;
        activity = activity ? activity : userExpenses.activity;
        amount = amount ? amount : userExpenses.amount;
        spentOn = spentOn ? spentOn : userExpenses.spent_on;
        isSpentLimitChanged = userExpenses['is_spent_limit_changed'] ? false :  true;

        let categoryId = null;

        if (userExpenses.categoryName !== capitalizeFirstLetters({ str: categoryName, withSpace: true, skipFirst: false })) {
            const category_details = await expensedb.getCategoryByName({
                categoryName: capitalizeFirstLetters({ str: categoryName, withSpace: true, skipFirst: false }),
                fieldsToQuery: ['category_name', 'id'],
            });
            if (!category_details) {
                const new_category = await expensedb.addCategory({
                    categoryName: capitalizeFirstLetters({ str: categoryName, withSpace: true, skipFirst: false }),
                    userId,
                });
                categoryId = new_category.id;
            } else {
                categoryId = category_details['id'];
            }
        } else {
            categoryId = userExpenses['category_id']
        }

        return await expensedb.updateUserExpense({
            expenseId,
            activity: capitalizeFirstLetters({str: activity, withSpace: true, skipFirst: false }),
            categoryId,
            amount,
            spentOn,
            userId,
            isSpentLimitChanged,
        })
    };

    function validateData({ expenseId }) {
        const schema = Joi.object({
            expenseId: Joi.string().guid().required(),
        });
        const { error } = schema.validate({ expenseId });
        if (error) {
            const message = [(getErrorMessage('ER-00001') || ''), error.message].join(', ');
            throw new ValidationError('ER-00001', message);
        }
    }
};
