const express = require('express');
const config = require('./config');
const app = express();
const route = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const makeHttpCallBack = require('./http-server-callback');
const controllers = require('./controllers');
const bodyParser = require('body-parser');

// End points 

route.post('/v1/add-expense', makeHttpCallBack(controllers.addExpenseAction));
// route.post('/v1/upload-student-data-csv/:standard/:organisationId', upload.single('studentData'), makeHttpCallBack(controllers.uploadStudentDetailsAction));

// Middlewares

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(`/${config.serviceConfig.serviceEndPoint.name}`, route);

const PORT = process.env.PORT || config.serviceConfig.serviceEndPoint.port;
app.listen(PORT, (error) => error ? 
    console.log('Error In Starting The Service', error) : 
    console.log(`Service Started on ${config.serviceConfig.serviceEndPoint.host + ':' + config.serviceConfig.serviceEndPoint.port}`));