import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { keyToken } from '../utils/data';

export const tokenText = 'token';

export const verifyToken = (req : Request , res : Response , next : NextFunction) => {

  const token = (req.headers['authorization'] as String)?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Access Denied: No token provided.' });
  }

  try {
      const decoded = jwt.verify(token, keyToken);
      req[tokenText] = decoded;
      next();
  } catch (err) {
      res.status(400).json({ message: 'Invalid token.' });
  }
};
