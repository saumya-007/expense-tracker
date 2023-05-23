/**
 * Imports
 */
const express = require('express');
const config = require('./config');

const makeHttpCallBack = require('./http-server-callback');
const controllers = require('./controllers');
const bodyParser = require('body-parser');

/**
 * Exposed Endpoints
 */
const route = express.Router();
route.post('/v1/add-user', makeHttpCallBack(controllers.adduserAction));
route.get('/v1/get-user-by-id/:userId', makeHttpCallBack(controllers.getUserByIdAction));
route.get('/v1/get-user-by-email/:email', makeHttpCallBack(controllers.getUserByEmailAction));
route.put('/v1/update-user/:userId', makeHttpCallBack(controllers.updateUserAction));

/**
 * Middlewares
 */
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/${config.serviceConfig.serviceEndPoint.name}`, route);

/**
 * Starting the server
 */
const PORT = process.env.PORT || config.serviceConfig.serviceEndPoint.port;
app.listen(PORT, (error) => error ?
    console.log('Error In Starting The Service', error) :
    console.log(`Service Started on ${config.serviceConfig.serviceEndPoint.host + ':' + config.serviceConfig.serviceEndPoint.port}`));