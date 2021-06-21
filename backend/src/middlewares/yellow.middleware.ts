import { NextFunction, Request, Response } from 'express';
import randomcolor from 'randomcolor';

const addYellow = (req: Request, res: Response, next: NextFunction) => {
  const color = randomcolor({
    hue: 'yellow',
  });
  res.append('Color', color);
  next();
};

export default addYellow;
