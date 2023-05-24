/**
 * Imports
 */
const express = require('express');
const config = require('./config');

const makeHttpCallBack = require('./http-server-callback');
const controllers = require('./controllers');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Exposed Endpoints
 */
const route = express.Router();
route.get('/v1/get-signup-link', makeHttpCallBack(controllers.getGoogleSignUpLinkAction));
route.get('/v1/oauth/google', makeHttpCallBack(controllers.oauthHandlerAction));
route.post('/v1/authenticate', makeHttpCallBack(controllers.authenticateUserAction));
// use it as middleware in all other applications in callback or something
route.post('/v1/verify-access-token', makeHttpCallBack(controllers.verifyAccessTokenAction));

/**
 * Middlewares
 */
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/${config.serviceConfig.serviceEndPoint.name}`, route);

/**
 * Starting the server
 */
const PORT = process.env.PORT || config.serviceConfig.serviceEndPoint.port;
app.listen(PORT, (error) => error ?
    console.log('Error In Starting The Service', error) :
    console.log(`Service Started on ${config.serviceConfig.serviceEndPoint.host + ':' + config.serviceConfig.serviceEndPoint.port}`));