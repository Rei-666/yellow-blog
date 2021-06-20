import express from 'express';
import { CallbackError } from 'mongoose';
import { BlogPost, User } from '../interfaces';
import { PostModel } from '../models';
import { isAuthed } from '../middlewares';
import { paginationOptions, getOffsetFromPage } from '../db';

const router = express.Router();

router.get('/posts/:id/', (req, res) => {
  const { id } = req.params;
  PostModel.findById(id)
    .populate('author', '-passwordHash')
    .exec((err: CallbackError, post: BlogPost | null) => {
      res.json(post);
    });
});

router.put('/posts/:id/', async (req, res) => {
  const { id } = req.params;
  const author = (req.user as User).id;
  const post = await PostModel.findById(id).exec();
  if (!post) {
    res.sendStatus(404);
    return;
  }
  if (!post!.author.equals(author)) {
    res.sendStatus(401);
    return;
  }
  const { title, body } = req.body;
  await post!.updateOne({ title, body });
  res.json({ success: true, id: post.id });
});

router.delete('/posts/:id/', async (req, res) => {
  const { id } = req.params;
  const author = (req.user as User).id;
  const post = await PostModel.findById(id).exec();
  if (!post) {
    res.sendStatus(404);
    return;
  }
  if (!post!.author.equals(author)) {
    res.sendStatus(401);
    return;
  }
  await post.delete();
  res.json({ success: true });
});

router.get('/posts', (req, res) => {
  const { page } = req.query;

  const offset = getOffsetFromPage(<string>page || 1);

  PostModel.paginate({}, {
    ...paginationOptions, offset, sort: { date: 'desc' }, populate: { path: 'author', select: '-passwordHash' },
  }, (err, posts) => {
    res.json(posts);
  });
});

router.post('/posts', isAuthed, (req, res) => {
  const newPost = new PostModel({ ...req.body, author: (req.user as User).id });
  newPost.save();
  res.json({ success: true, id: newPost.id });
});

export default router;
