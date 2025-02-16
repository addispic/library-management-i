import { Request, Response } from "express";

// models
// borrow
import BorrowModel from "../models/borrow.model";
// books
import BooksModel from "../models/books.model";
// users
import UsersModel from "../models/users.model";

// get borrow
const getBorrows = async (req: Request, res: Response) => {
  try {
    const borrows = await BorrowModel.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookDetail",
        },
      },
      {
        $unwind: "$bookDetail",
      },
      {
        $group: {
          _id: "$book",
          borrows: {
            $push: {
              _id: "$_id",
              user: "$user",
              duration: "$duration",
              status: "$status",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
      {
        $project: {
          book: "$_id",
          borrows: 1,
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({ borrows });
  } catch (err) {
    return res.status(400).json({ message: "get borrow error" });
  }
};

// get borrow detail
const getBorrowDetail = async (req: Request, res: Response) => {
  try {
    const borrowsDetail = await BorrowModel.find()
      .select({
        _id: 1,
        user: 1,
        book: 1,
        duration: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ borrowsDetail });
  } catch (err) {
    return res.status(400).json({ error: "get borrows detail error" });
  }
};

// i borrows
const iBorrows = async (req: Request, res: Response) => {
  try {
    const iBorrows = await BorrowModel.find({ user: req._id }).select({
      _id: 1,
      book: 1,
      status: 1,
    });
    return res.status(200).json({ iBorrows });
  } catch (err) {
    return res.status(400).json({ error: "get i borrows error" });
  }
};
// new borrow
const newBorrow = async (req: Request, res: Response) => {
  try {
    const { _id: book, duration } = req.body;
    const user = req._id;
    const isBorrowExist = await BorrowModel.findOne({ user, book });
    if (isBorrowExist) {
      return res.status(400).json({ error: "you already order the book" });
    }
    const isBookAvailable = await BooksModel.findById(book);
    const totalOrders = await BorrowModel.find({ book });
    if (isBookAvailable?.total === totalOrders.length) {
      return res.status(400).json({ error: "all books are ordered" });
    }
    const newBookBorrow = await BorrowModel.create({
      user,
      book,
      duration: Number(duration),
      status: "pending",
    });
    return res.status(200).json({ newBookBorrow });
  } catch (err) {
    return res.status(400).json({ error: "add new borrow error" });
  }
};

// update borrow
const updateBorrow = async (req: Request, res: Response) => {
  try {
    const user = req._id;
    const { _id } = req.params;
    const { status } = req.body;
    const isUserCan = await UsersModel.findById(user);
    if (!isUserCan || !["super", "sub"].includes(isUserCan.role)) {
      return res
        .status(401)
        .json({ error: "unauthorized to update the borrow" });
    }
    const isBorrow = await BorrowModel.findById(_id);
    if (!isBorrow || isBorrow.status === status) {
      return res
        .status(200)
        .json({ error: "borrow not exist or the same status" });
    }
    const updatedBorrow = await BorrowModel.findByIdAndUpdate(
      _id,
      { status },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ updatedBorrow });
  } catch (err) {
    return res.status(400).json({ error: "update borrow error" });
  }
};

// delete borrow
const deleteBorrow = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const user = req._id;
    const isUserCan = await UsersModel.findById(user);
    if (!isUserCan || !["super", "sub"].includes(isUserCan.role)) {
      return res
        .status(400)
        .json({ error: "unauthorized to delete the borrow" });
    }
    const isBorrowExist = await BorrowModel.findById(_id)
    if(!isBorrowExist){
      return res.status(400).json({error: 'borrow not exist'})
    }
    const {book} = isBorrowExist
    await BorrowModel.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ message: "borrow deleted successfully", _id,book });
  } catch (err) {
    return res.status(400).json({ error: "delete borrow error" });
  }
};

// exports
export {
  getBorrows,
  iBorrows,
  newBorrow,
  updateBorrow,
  deleteBorrow,
  getBorrowDetail,
};
