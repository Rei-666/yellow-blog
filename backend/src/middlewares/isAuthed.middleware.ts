import { NextFunction, Request, Response } from 'express';

const isAuthed = (req: Request, res: Response, next: NextFunction): void => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default isAuthed;
