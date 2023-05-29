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
        spendLimit,
        amount,
        categoryName,
        spentOn
    }) {

        console.log(`
        @ userId: ${userId}
        @ expenseId: ${expenseId},
        @ activity: ${activity},
        @ spendLimit: ${spendLimit},
        @ amount: ${amount},
        @ categoryName: ${categoryName},
        @ spentOn: ${spentOn} 
      `)

        validateData({
            expenseId,
            activity,
            spendLimit,
            amount,
            categoryName,
            spentOn
        });

        /**
         > Getting all details from expense db joined with category db
         > If category name changes and if that category does not exist in db then add new category else take that id and update it in expense db
         */
        const userExpenses = await expensedb.getUserExpense({ userId, expenseId });

        expenseId = expenseId ? expenseId : userExpenses.expenseId;
        activity = activity ? activity : userExpenses.activity;
        spendLimit = spendLimit ? spendLimit : userExpenses.spendLimit;
        amount = amount ? amount : userExpenses.amount;
        spentOn = spentOn ? spentOn : userExpenses.spentOn;

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
            isAboveLimit: parseFloat(amount) > parseFloat(spendLimit), 
            spendLimit,
            spentOn,
            userId,
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
