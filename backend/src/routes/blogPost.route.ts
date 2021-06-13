import express from 'express';
import { User } from '../interfaces';
import { PostModel } from '../models';
import { isAuthed } from '../middlewares';
import { paginationOptions, getOffsetFromPage } from '../db';

const router = express.Router();

router.get('/posts', (req, res) => {
  const { page } = req.query;

  const offset = getOffsetFromPage(<string>page || 1);

  PostModel.paginate({}, {
    ...paginationOptions, offset, sort: { date: 'desc' },
  }, (err, posts) => {
    res.json(posts);
  });
});

router.post('/posts', isAuthed, (req, res) => {
  const newPost = new PostModel({ ...req.body, author: (req.user as User).id });
  newPost.save();
  res.json({ success: true });
});

export default router;
