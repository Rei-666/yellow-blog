import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import expressSession, { SessionOptions } from 'express-session';
import cors from 'cors';
import {
  DB_PASSWORD, DB_USERNAME, DB_DATABASE,
} from './config';
import router from './routes';

const mongoUrl = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bgjio.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;
const app = express();
const port = 4000;

app.use(morgan('tiny'));
app.use(cors({
  origin: ['http://localhost:3000', 'https://yellowblog.netlify.app'],
  credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  const sessionSettings: SessionOptions = {
    cookie: {
      sameSite: 'none',
      secure: false,
    },
    secret: 'dog',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sessionSettings.cookie!.secure = true;
  }

  app.use(expressSession(sessionSettings));

  app.use('/api', router);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
