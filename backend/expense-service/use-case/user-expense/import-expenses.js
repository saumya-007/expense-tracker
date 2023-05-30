module.exports = function makeImportExpense({
    Joi,
    fs,
    parse,
    getErrorMessage,
    capitalizeFirstLetters,
    addExpense,
    expenseTableFields,
    ValidationError,
}) {
    return async function importExpense({ file, userId }) {
        const csvData = await getFileData({ file })
        const expenses = [];
        processCsvData({ csvData, expenses });
        await Promise.allSettled(expenses.map(async (expense) => {
            return await addExpense({
                activity: expense.activity,
                spendLimit: expense.spendLimit,
                amount: expense.amount,
                userId: userId,
                categoryName: expense.categoryName,
                spentOn: expense.spentOn,
              });
        }));

        /**
         * TO DO - code to delete remove all imported data if any one of them fails
         */
        return 'Imported succesfully';
    }

    function getFileData({ file }) {
        const csvFileData = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(file.path)
                .pipe(parse({ delimiter: ',', from_line: 1 }))
                .on('data', (row) => {
                    if (row && row.length > 1) {
                        const data = row.filter((data) => data);
                        data && data.length ? csvFileData.push(row) : null;
                    }
                }).on('error', (error) => {
                    reject(error);
                }).on('end', () => {
                    resolve(csvFileData);
                });
        });
    }

    function processCsvData({ csvData, expenses }) {
        const headers = [...csvData[0]];
        const headersMapping = {};
        csvData.forEach((row, index) => {
            if (index === 0) {
                const isHeadersValid = row.sort().toString() === expenseTableFields.sort().toString(); expenseTableFields
                if (!isHeadersValid) {
                    const message = getErrorMessage('ER-00003') || '';
                    throw new ValidationError('ER-00003', message);
                }
            } else {
                headers.forEach((header, index) => {
                    headersMapping[`${capitalizeFirstLetters({ 
                        str: header,
                        withSpace: false,
                        skipFirst: true
                    })}`] = header === 'spent_on' ? new Date(row[index])?.toISOString() : row[index]
                });
                validateRow({ ...headersMapping });
                expenses.push({ ...headersMapping });
            }
        })
    }

    function validateRow({
        activity,
        spendLimit,
        amount,
        categoryName,
        spentOn,
    }) {
        const schema = Joi.object({
            activity: Joi.string().required(),
            spendLimit: Joi.number().required(),
            amount: Joi.number().required(),
            categoryName: Joi.string().required(),
            spentOn: Joi.date().max(new Date())
        });
        const { error } = schema.validate({
            activity,
            spendLimit,
            amount,
            categoryName,
            spentOn,
        });
        if (error) {
            console.log(error);
            const message = [(getErrorMessage('ER-00003') || ''), error.message].join(', ');
            throw new ValidationError('ER-00003', message);
        }
    }
}