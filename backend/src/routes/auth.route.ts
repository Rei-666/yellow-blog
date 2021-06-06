import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { CallbackError } from 'mongoose';
import User from '../interfaces/User.interface';
import UserModel from '../models/user.model';
import { isAuthed } from '../middlewares';

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await UserModel.findOne({ username });
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return done(null, user);
  }
  return done(null, false);
}));

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, (user as User).id);
});

passport.deserializeUser((id, done) => {
  console.log(id);
  UserModel.findById(id, (err: CallbackError, user: User) => {
    done(err, user);
  });
});

const router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ logged: true });
});

router.post('/logout', isAuthed, (req, res) => {
  req.logout();
  res.json({ success: true });
});

router.post('/signup', async (req, res) => {
  if (req.user) {
    res.json({ error: 'You are already logged in' });
    return;
  }
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  const user: User = { ...req.body, passwordHash };
  const newUser = new UserModel(user);
  try {
    await newUser.save();
    res.json({ success: true });
  } catch (e) {
    res.json(e);
  }
});

export default router;
