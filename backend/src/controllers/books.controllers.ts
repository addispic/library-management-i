import { Request, Response } from "express";
import mongoose from "mongoose";
import fs from "fs";

// config
import cloudinary from "../config/cloudinary";

// models
// models
import BooksModel from "../models/books.model";

// get books
const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await BooksModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ books });
  } catch (err) {
    return res.status(400).json({ error: "get books error" });
  }
};

// new book
const newBook = async (req: Request, res: Response) => {
  try {
    const user = req._id;
    const { title, author, isbn, total, date, category, description } =
      req.body;
    let file = req.file?.path;
    if (!file) {
      return res.status(400).json({ error: "select book cover page" });
    }
    const result = await cloudinary.uploader.upload(file, {
      folder: "lm/uploads/books",
    });
    const newBook = await BooksModel.create({
      user,
      title,
      author,
      file: result.secure_url,
      public_id: result.public_id,
      isbn,
      total: Number(total),
      date: date,
      category,
      description,
    });
    fs.unlinkSync(file as string);
    return res.status(200).json({ newBook });
  } catch (err) {
    return res.status(400).json({ error: "add new book failed" });
  }
};

// update book
const updateBook = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const isBookExist = await BooksModel.findById(_id);
    if (!isBookExist) {
      return res.status(400).json({ error: "book not exist to update" });
    }
    const { title, author, isbn, total, date, category, description } =
      req.body;
    let file = req.file?.path;
    if (file) {
      await cloudinary.uploader.destroy(isBookExist.public_id);
      const result = await cloudinary.uploader.upload(file, {
        folder: "lm/uploads/books",
      });
      const updatedBook = await BooksModel.findByIdAndUpdate(
        _id,
        {
          title,
          author,
          isbn,
          total,
          date,
          category,
          description,
          file: result.secure_url,
          public_id: result.public_id,
        },
        { new: true, runValidators: true }
      );
      fs.unlinkSync(file as string);
      return res.status(201).json({ updatedBook });
    }

    const updatedBook = await BooksModel.findByIdAndUpdate(
      _id,
      { title, author, isbn, total, date, category, description },
      { new: true, runValidators: true }
    );

    return res.status(201).json({ updatedBook });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "update book error" });
  }
};

// delete book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const user = req._id;
    const isBookExist = await BooksModel.findById(_id);
    if (!isBookExist) {
      return res.status(400).json({ error: "book not found" });
    }
    if (!new mongoose.Types.ObjectId(user).equals(isBookExist.user)) {
      return res.status(400).json({ error: "unauthorized to delete book" });
    }
    await cloudinary.uploader.destroy(isBookExist.public_id);
    await BooksModel.findByIdAndDelete(_id);
    return res.status(200).json({ message: "book deleted successfully", _id });
  } catch (err) {
    return res.status(400).json({ error: "delete book failed" });
  }
};

// exports
export { getBooks, newBook, updateBook, deleteBook };
