import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import expressSession, { SessionOptions } from 'express-session';
import cors from 'cors';
import config from './config';
import router from './routes';
import { addYellow } from './middlewares';

const mongoUrl = config.DB_URL;
const app = express();
const port = 4000;

app.use(morgan('tiny'));
app.use(cors({
  origin: config.ORIGIN,
  credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  const sessionSettings: SessionOptions = {
    cookie: {
      sameSite: 'lax',
      secure: false,
    },
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }),
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sessionSettings.cookie!.sameSite = 'none';
    sessionSettings.cookie!.secure = true;
  }

  app.use(expressSession(sessionSettings));

  app.use(addYellow);

  app.use('/api', router);

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
