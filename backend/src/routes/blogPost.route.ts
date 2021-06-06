import express from 'express';
import { User } from '../interfaces';
import { Post } from '../models';
import { isAuthed } from '../middlewares';

const router = express.Router();

router.get('/posts', isAuthed, (req, res) => {
  Post.find({ author: (req.user as User).id }).sort({ date: 'desc' }).limit(5).exec((err, posts) => {
    res.json(posts);
  });
});

router.post('/posts', (req, res) => {
  const newPost = new Post({ ...req.body, author: (req.user as User).id });
  newPost.save();
  res.json({ success: true });
});

export default router;
