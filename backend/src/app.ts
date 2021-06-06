import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import expressSession from 'express-session';
import {
  DB_PASSWORD, DB_USERNAME, DB_DATABASE,
} from './config';
import router from './routes';

const mongoUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bgjio.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;
const app = express();
const port = 3000;

app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  app.use(expressSession({
    secret: 'dog',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
  }));

  app.use('/api', router);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
