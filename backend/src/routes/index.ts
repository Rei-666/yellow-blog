import { Router } from 'express';
import authRouter from './auth.route';
import blogRouter from './blogPost.route';
import profileRouter from './profile.route';

const router = Router();

router.use(authRouter);
router.use(blogRouter);
router.use(profileRouter);

export default router;
