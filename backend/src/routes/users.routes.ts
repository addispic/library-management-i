import { Router, Request, Response } from "express";

// controllers
// users
import {
  getUsers,
  signup,
  login,
  updateUserRole,
  logout,
  isAuthenticated,
} from "../controllers/users.controllers";

// middlewares
// users
import { privateRoutes } from "../middlewares/users.middleware";

// router
const router = Router();

// get users
router.get("/", (req: Request, res: Response) => {
  getUsers(req, res);
});

// signup
router.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});

// login
router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

// update user role
router.put("/update/:_id",privateRoutes(), (req: Request, res: Response) => {
  updateUserRole(req, res);
});

// logout
router.get("/logout", (req: Request, res: Response) => {
  logout(req, res);
});

// is authenticated
router.get(
  "/is-authenticated",
  privateRoutes(),
  (req: Request, res: Response) => {
    isAuthenticated(req, res);
  }
);

// exports
export default router;
