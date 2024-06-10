import { Request, Response, NextFunction } from "express";
const loginmiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400).json({ message: "Not authorized" });
  }
};

export default loginmiddleware;
