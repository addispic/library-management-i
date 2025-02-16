import { Router, Request, Response } from "express";

// controllers
// borrow
import {
  getBorrows,
  getBorrowDetail,
  iBorrows,
  newBorrow,
  updateBorrow,
  deleteBorrow,
} from "../controllers/borrow.controllers";

// router
const router = Router();

// get borrow
router.get("/", (req: Request, res: Response) => {
  getBorrows(req, res);
});
// get borrows detail
router.get("/details", (req: Request, res: Response) => {
  getBorrowDetail(req, res);
});
// get book and user
router.get("/i-borrows", (req: Request, res: Response) => {
  iBorrows(req, res);
});
// add new borrow
router.post("/new", (req: Request, res: Response) => {
  newBorrow(req, res);
});

// update borrow
router.put("/update/:_id", (req: Request, res: Response) => {
  updateBorrow(req, res);
});

// delete
router.delete("/delete/:_id", (req: Request, res: Response) => {
  deleteBorrow(req, res);
});

// exports
export default router;
