import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      staffId?: number;
    }
  }
}

interface JwtPayload {
  id: number;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: "トークンが存在しません" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    req.staffId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "トークンが無効です" });
  }
};

export default isAuthenticated;
