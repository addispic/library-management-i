import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// store
import { RootState } from "../../store";

// types
type IBorrow = {
  _id: string;
  duration: number;
  status: string;
  user: string;
  createdAt: string;
  updatedAt: string;
};
type IBorrows = {
  book: string;
  borrows: IBorrow[];
};
type IIBorrows = {
  _id: string;
  book: string;
  status: string;
};
type IInitialState = {
  isBorrowsFetching: boolean;
  isIBorrowFetching: boolean;
  isNewBorrowUploading: boolean;
  isNewBorrowUploadingDone: boolean;
  borrows: IBorrows[];
  iBorrows: IIBorrows[];
};

// initial state
const initialState: IInitialState = {
  isBorrowsFetching: false,
  isIBorrowFetching: false,
  borrows: [],
  iBorrows: [],
  isNewBorrowUploading: false,
  isNewBorrowUploadingDone: false,
};

// get borrows
export const getBorrows = createAsyncThunk("borrows/getBorrows", async () => {
  try {
    const response = await axios.get("/api/borrows");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { error: "get borrows error" };
    }
  }
});

// get i borrows
export const getIBorrows = createAsyncThunk("borrows/getIBorrows", async () => {
  try {
    const response = await axios.get("/api/borrows/i-borrows");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { error: "get i borrows error" };
    }
  }
});

// add new borrow
export const addNewBorrow = createAsyncThunk(
  "borrows/addNewBorrow",
  async (data: { _id: string; duration: string }) => {
    try {
      const response = await axios.post("/api/borrows/new", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "add new borrow error" };
      }
    }
  }
);

// borrow slice
const borrowsSlice = createSlice({
  name: "borrows",
  initialState,
  reducers: {
    resetIsNewBorrowUploadingDone: (state) => {
      state.isNewBorrowUploadingDone = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get borrows
      .addCase(getBorrows.pending, (state) => {
        state.isBorrowsFetching = true;
      })
      .addCase(getBorrows.fulfilled, (state, action) => {
        state.isBorrowsFetching = false;
        if (action.payload.borrows) {
          state.borrows = action.payload.borrows;
        }
      })
      .addCase(getBorrows.rejected, (state) => {
        state.isBorrowsFetching = false;
      })
      // get i borrow
      .addCase(getIBorrows.pending, (state) => {
        state.isIBorrowFetching = true;
      })
      .addCase(getIBorrows.fulfilled, (state, action) => {
        state.isIBorrowFetching = false;
        if (action.payload.iBorrows) {
          state.iBorrows = action.payload.iBorrows;
        }
      })
      .addCase(getIBorrows.rejected, (state) => {
        state.isIBorrowFetching = false;
      })
      // add new borrow
      .addCase(addNewBorrow.pending, (state) => {
        state.isNewBorrowUploading = true;
      })
      .addCase(addNewBorrow.fulfilled, (state, action) => {
        state.isNewBorrowUploading = false;
        if (action.payload.newBookBorrow) {
          state.isNewBorrowUploadingDone = true;
          const { _id, user, book, duration, status, createdAt, updatedAt } =
            action.payload.newBookBorrow;
          state.iBorrows.push({ _id, book, status });
          const topIndex = state.borrows.findIndex((br) => br.book === book);
          if (topIndex === -1) {
            state.borrows.push({
              book,
              borrows: [{ _id, user, duration, status, createdAt, updatedAt }],
            });
          } else {
            state.borrows[topIndex].borrows.push({
              _id,
              user,
              duration,
              status,
              createdAt,
              updatedAt,
            });
          }
        }
      })
      .addCase(addNewBorrow.rejected, (state) => {
        state.isNewBorrowUploading = false;
      });
  },
});

// exports
// actions
export const { resetIsNewBorrowUploadingDone } = borrowsSlice.actions;
// selectors
// borrows
export const borrowsSelector = (state: RootState) => state.borrows.borrows;
// i borrows
export const iBorrowsSelector = (state: RootState) => state.borrows.iBorrows;
// is new borrow uploading
export const isNewBorrowUploadingSelector = (state: RootState) =>
  state.borrows.isNewBorrowUploading;
// is new borrow uploading done
export const isNewBorrowUploadingDoneSelector = (state: RootState) =>
  state.borrows.isNewBorrowUploadingDone;
// reducer
export default borrowsSlice.reducer;
