import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// config
import { SOCKET } from "../../config";

// store
import { RootState } from "../../store";

// types
export type IBook = {
  _id: string;
  user: string;
  title: string;
  author: string;
  file: string;
  public_id: string;
  isbn: string;
  total: number;
  date: string;
  category: string;
  description: string;
};
type IInitialSate = {
  isBooksFetching: boolean;
  books: IBook[];
  isBookUploading: boolean;
  isBookUploadingDone: boolean;
  isBookDeleting: boolean;
  isBookDeletingDone: boolean;
  isBookEditOn: IBook | null;
};

// initial state
const initialState: IInitialSate = {
  books: [],
  isBooksFetching: false,
  isBookUploading: false,
  isBookUploadingDone: false,
  isBookDeleting: false,
  isBookDeletingDone: false,
  isBookEditOn: null,
};

// get books
export const getBooks = createAsyncThunk("books/getBooks", async () => {
  try {
    const response = await axios.get("/api/books");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { error: "unexpect error occurred, get books" };
    }
  }
});

// add new book
export const addNewBook = createAsyncThunk(
  "books/addNewBook",
  async (data: FormData) => {
    try {
      const response = await axios.post("/api/books/new", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "unexpected error occurred, add new book" };
      }
    }
  }
);

// update book
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (data: FormData) => {
    try {
      const response = await axios.put(
        `/api/books/update/${data.get("_id")}`,
        data
      );
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "unexpected error occurred, update book" };
      }
    }
  }
);

// delete book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (_id: string) => {
    try {
      const response = await axios.delete(`/api/books/delete/${_id}`);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "unexpected error has occurred, delete book" };
      }
    }
  }
);

// slices
const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // reset
    resetIsBookUploadingDone: (state) => {
      state.isBookUploadingDone = false;
    },
    resetIsBookDeletingDone: (state) => {
      state.isBookDeletingDone = false;
    },
    setIsBookEditOn: (state, action: PayloadAction<IBook | null>) => {
      state.isBookEditOn = action.payload;
    },
    newBookEvent: (state, action) => {
      state.books.unshift(action.payload);
    },
    updateBookEvent: (state, action) => {
      state.books[
        state.books.findIndex((book) => book._id === action.payload._id)
      ] = action.payload;
    },
    deleteBookEvent: (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // get books
      .addCase(getBooks.pending, (state) => {
        state.isBooksFetching = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isBooksFetching = false;
        if (action.payload.books) {
          state.books = action.payload.books;
        }
      })
      .addCase(getBooks.rejected, (state) => {
        state.isBooksFetching = false;
      })
      // add new book
      .addCase(addNewBook.pending, (state) => {
        state.isBookUploading = true;
      })
      .addCase(addNewBook.fulfilled, (state, action) => {
        state.isBookUploading = false;
        if (action.payload.newBook) {
          state.isBookUploadingDone = true;
          state.books.unshift(action.payload.newBook);
          SOCKET.emit("newBook", action.payload.newBook);
        }
      })
      .addCase(addNewBook.rejected, (state) => {
        state.isBookUploading = false;
      })
      // update book
      .addCase(updateBook.pending, (state) => {
        state.isBookUploading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isBookUploading = false;
        if (action.payload.updatedBook) {
          state.isBookUploadingDone = true;
          state.books[
            state.books.findIndex(
              (book) => book._id === action.payload.updatedBook._id
            )
          ] = action.payload.updatedBook;
          SOCKET.emit("updateBook", action.payload.updatedBook);
        }
      })
      .addCase(updateBook.rejected, (state) => {
        state.isBookUploading = false;
      })
      // delete book
      .addCase(deleteBook.pending, (state) => {
        state.isBookDeleting = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isBookDeleting = false;
        if (action.payload._id) {
          state.isBookDeletingDone = true;
          state.books = state.books.filter(
            (book) => book._id !== action.payload._id
          );
          SOCKET.emit("deleteBook", action.payload._id);
        }
      })
      .addCase(deleteBook.rejected, (state) => {
        state.isBookDeleting = false;
      });
  },
});

// exports
// actions
export const {
  resetIsBookUploadingDone,
  resetIsBookDeletingDone,
  setIsBookEditOn,
  newBookEvent,
  updateBookEvent,
  deleteBookEvent,
} = booksSlice.actions;
// selectors
// books
export const booksSelector = (state: RootState) => state.books.books;
// is book uploading
export const isBookUploadingSelector = (state: RootState) =>
  state.books.isBookUploading;
// is book uploading done
export const isBookUploadingDoneSelector = (state: RootState) =>
  state.books.isBookUploadingDone;
// is book deleting
export const isBookDeletingSelector = (state: RootState) =>
  state.books.isBookDeleting;
// is book deleting done
export const isBookDeletingDoneSelector = (state: RootState) =>
  state.books.isBookDeletingDone;
// is book edit on
export const isBookEditOnSelector = (state: RootState) =>
  state.books.isBookEditOn;
// reducer
export default booksSlice.reducer;
