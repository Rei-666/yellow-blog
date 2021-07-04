import { NextFunction, Request, Response } from 'express';
import randomcolor from 'randomcolor';

const addYellow = (req: Request, res: Response, next: NextFunction) => {
  const color = randomcolor({
    hue: 'yellow',
  });

  const original = res.json;

  function jsonHook(this: any, json: any) {
    const newJson = json;
    newJson.color = color;
    return original.call(this, newJson);
  }

  res.json = jsonHook;
  next();
};

export default addYellow;
