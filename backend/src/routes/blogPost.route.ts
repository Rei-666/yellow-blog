import express from 'express';
import { User } from '../interfaces';
import { Post } from '../models';
import { isAuthed } from '../middlewares';
import { paginationOptions } from '../db';

const router = express.Router();

router.get('/posts', isAuthed, (req, res) => {
  Post.paginate({ author: (req.user as User).id }, { ...paginationOptions, sort: { date: 'desc' } }, (err, posts) => {
    res.json(posts);
  });
});

router.post('/posts', (req, res) => {
  const newPost = new Post({ ...req.body, author: (req.user as User).id });
  newPost.save();
  res.json({ success: true });
});

export default router;
