import { Router } from 'express';
import { PostModel } from '../models';
import { User } from '../interfaces';
import { isAuthed } from '../middlewares';

const router = Router();

router.get('/profile', isAuthed, (req, res) => {
  res.json({ logged: true, user: req.user });
});

router.get('/profile/posts', isAuthed, (req, res) => {
  PostModel.find({ author: (req.user as User).id }, (err, data) => {
    res.json({ data });
  });
});

export default router;
