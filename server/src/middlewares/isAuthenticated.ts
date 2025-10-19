import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  id?: string;
}

const isAuthenticated = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.',
      });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY as string) as { userId: string };

    if (!decodeToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });
    }
    req.id = decodeToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export default isAuthenticated;
