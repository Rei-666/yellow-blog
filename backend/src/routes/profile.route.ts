import { Router } from 'express';
import { Post } from '../models';
import { User } from '../interfaces';

const router = Router();

router.get('/profile', (req, res) => {
  res.json({ user: req.user });
});

router.get('/profile/posts', (req, res) => {
  Post.find({ author: (req.user as User).id }, (err, posts) => {
    res.json(posts);
  });
});

export default router;
