import express from 'express';

const app = express();

import {APP_KEY, ECOMDB} from './config';

import router from './routes';

import errorHandler from './middleware/errorHandler';
import mongoose from 'mongoose';
import CustomeErrorHandler from './customError/CustomErrorHandler';

app.use(express.json());

app.use('/ecom',router);

app.use(errorHandler);

app.listen(APP_KEY, () => console.log(`listening on port ${APP_KEY}`));

mongoose.connect(ECOMDB).then(() => console.log("DB Connected! now get lost")).catch((err) => {
    CustomeErrorHandler.DbError("you can not connect database with backend, please die in peace!")
})