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
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンが存在しません" });
  }

  jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "トークンが無効です" });
    }
    
    const decodedPayload = decoded as JwtPayload;

    req.staffId = decodedPayload.id; 

    next(); 
  });
};

export default isAuthenticated;
