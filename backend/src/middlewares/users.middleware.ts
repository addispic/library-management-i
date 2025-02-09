import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// utils
import { MAX_AGE, generateToken } from "../utils/users.utils";

// secret
const secret = process.env.SECRET as string;

// private routes
const privateRoutes =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["lm-auth-session"];
      if (!token) {
        res.status(401).json({ error: "unauthorized" });
        return;
      }
      const decodedToken = jwt.verify(token, secret) as any;
      if (!decodedToken) {
        res.status(401).json({ error: "unauthorized" });
        return;
      }
      res.cookie("lm-auth-session", generateToken(decodedToken?._id), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * MAX_AGE,
      });
      next();
    } catch (err) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }
  };

// exports
export { privateRoutes };
