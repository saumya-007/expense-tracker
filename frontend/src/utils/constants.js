import config from "../config";

export const DISPLAY_TEXT = {
    'app_title': 'Expense Tracker'
};

export const ENDPOINTS = {
    'get-expenses': `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense`,
    'delete-expenses': `${config.backendPoints['EXPENSE-SERVICE']}/v1/delete-user-expense`, 
    'update-expense': `${config.backendPoints['EXPENSE-SERVICE']}/v1/update-user-expense`,
    'get-expense-by-id': `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense`,
    'get-expenses-by-date': `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense-by-date`,
    'get-expenses-by-month': `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense-by-month`,
    'get-user-expense-by-month-and-category': `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense-by-month-and-category`,
}

export const MONTHS_ARRAY = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEK_ARRAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]