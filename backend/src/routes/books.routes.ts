import { Router, Request, Response } from "express";
import multer from 'multer'

// controllers
// books
import {
  getBooks,
  newBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controllers";

// router
const router = Router();

// get books
router.get("/", (req: Request, res: Response) => {
  getBooks(req, res);
});

// upload
const uploads = multer({dest: "uploads/"})

// new books
router.post("/new",uploads.single('book'), (req: Request, res: Response) => {
  newBook(req, res);
});

// update books
router.put("/update/:_id",uploads.single('book'), (req: Request, res: Response) => {
  updateBook(req, res);
});

// delete book
router.delete("/delete/:_id", (req: Request, res: Response) => {
  deleteBook(req, res);
});

// exports
export default router;
