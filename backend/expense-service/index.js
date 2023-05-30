/**
 * Imports
 */
const express = require('express');
const config = require('./config');
const multer = require('multer');
const { join, extname } = require('path');
const cors = require('cors');

const makeHttpCallBack = require('./http-server-callback');
const controllers = require('./controllers');
const bodyParser = require('body-parser');
const ServiceUtils = require('./utils/ServiceUtils');
const { generateRandomNumber } = ServiceUtils.getFunctions.bind(ServiceUtils)();

/**
 * Handeling multipart form data
 */
const storage = multer.diskStorage({
    destination: (req, _, cb) => {
        cb(null, join(__dirname, "/server-storage/"))
    },
    filename: (_, file, cb) => cb(null, generateRandomNumber() + extname(file.originalname))
});
const upload = multer({ storage: storage })

/**
 * Exposed Endpoints
 */
const route = express.Router();
route.post('/v1/add-user-expense', makeHttpCallBack(controllers.addExpenseAction));
route.post('/v1/import-user-expense' , upload.single('expense-data'), makeHttpCallBack(controllers.importExpensesAction));
route.get('/v1/get-user-expense', makeHttpCallBack(controllers.getUserExpenseAction));
route.delete('/v1/delete-user-expense/:expenseId', makeHttpCallBack(controllers.deleteUserExpenseAction));
route.put('/v1/update-user-expense/:expenseId', makeHttpCallBack(controllers.updateUserExpenseAction));

route.post('/v1/add-spend-limit', makeHttpCallBack(controllers.addSpendLimitAction));
route.get('/v1/get-all-spend-limit', makeHttpCallBack(controllers.getAllSpendLimitAction));
route.delete('/v1/delete-spend-limit/:spendLimitId', makeHttpCallBack(controllers.deleteSpendLimitAction));
route.put('/v1/update-spend-limit/:spendLimitId', makeHttpCallBack(controllers.updateSpendLimitAction));

/**
 * Middlewares
 */
const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/${config.serviceConfig.serviceEndPoint.name}`, route);

/**
 * Starting the server
 */
const PORT = process.env.PORT || config.serviceConfig.serviceEndPoint.port;
app.listen(PORT, (error) => error ?
    console.log('Error In Starting The Service', error) :
    console.log(`Service Started on ${config.serviceConfig.serviceEndPoint.host + ':' + config.serviceConfig.serviceEndPoint.port}`));