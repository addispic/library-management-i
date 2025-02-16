import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// config
import { SOCKET } from "../../config";

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
type IBorrowDetail = {
  _id: string;
  user: string;
  book: string;
  duration: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
type IInitialState = {
  isBorrowsFetching: boolean;
  isIBorrowFetching: boolean;
  isNewBorrowUploading: boolean;
  isNewBorrowUploadingDone: boolean;
  borrows: IBorrows[];
  iBorrows: IIBorrows[];
  borrowsDetail: IBorrowDetail[];
  isGetBorrowsDetailFetching: boolean;
  isBorrowUpdating: boolean;
  isBorrowDeleting: boolean;
};

// initial state
const initialState: IInitialState = {
  isBorrowsFetching: false,
  isIBorrowFetching: false,
  borrows: [],
  iBorrows: [],
  isNewBorrowUploading: false,
  isNewBorrowUploadingDone: false,
  borrowsDetail: [],
  isGetBorrowsDetailFetching: false,
  isBorrowUpdating: false,
  isBorrowDeleting: false,
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

// get borrows detail
export const getBorrowsDetail = createAsyncThunk(
  "borrows/getBorrowsDetail",
  async () => {
    try {
      const response = await axios.get("/api/borrows/details");
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "get borrows detail error" };
      }
    }
  }
);

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

// update borrow
export const updateBorrow = createAsyncThunk(
  "borrows/updateBorrow",
  async (data: { _id: string; status: string }) => {
    try {
      const { _id, status } = data;
      const response = await axios.put(`/api/borrows/update/${_id}`, {
        status,
      });
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "error occurred during borrow update" };
      }
    }
  }
);

// delete borrow
export const deleteBorrow = createAsyncThunk(
  "borrows/deleteBorrow",
  async (_id: string) => {
    try {
      const response = await axios.delete(`/api/borrows/delete/${_id}`);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "delete borrow error" };
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
    newBorrowEvent: (state, action) => {
      const { _id, user, book, duration, status, createdAt, updatedAt } =
        action.payload;
      // add to i borrows
      state.iBorrows.unshift({ _id, book, status });
      // add to borrows detail
      state.borrowsDetail.unshift({
        _id,
        user,
        book,
        duration,
        status,
        createdAt,
        updatedAt,
      });
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
    },
    updateBorrowEvent: (state, action) => {
      const { _id, book, status, updatedAt } = action.payload;
      // borrows detail
      state.borrowsDetail[
        state.borrowsDetail.findIndex((br) => br._id === _id)
      ].status = status;
      state.borrowsDetail[
        state.borrowsDetail.findIndex((br) => br._id === _id)
      ].updatedAt = updatedAt;
      // add to i borrows
      if (state.iBorrows.findIndex((ib) => ib._id === _id) !== -1) {
        state.iBorrows[
          state.iBorrows.findIndex((ib) => ib._id === _id)
        ].status = status;
      }
      // top index
      const topIndex = state.borrows.findIndex(
        (borrow) => borrow.book === book
      );
      // second index
      const secondIndex = state.borrows[topIndex].borrows.findIndex(
        (br) => br._id === _id
      );
      state.borrows[topIndex].borrows[secondIndex].status = status;
      state.borrows[topIndex].borrows[secondIndex].updatedAt = updatedAt;
    },
    deleteBorrowEvent: (state,action) => {
      const { _id, book } = action.payload;
      // updates
      state.borrowsDetail = state.borrowsDetail.filter(
        (br) => br._id !== _id
      );
      // i borrows
      state.iBorrows = state.iBorrows.filter((ib) => ib.book !== book);
    }
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
      // get borrows detail
      .addCase(getBorrowsDetail.pending, (state) => {
        state.isGetBorrowsDetailFetching = true;
      })
      .addCase(getBorrowsDetail.fulfilled, (state, action) => {
        state.isGetBorrowsDetailFetching = false;
        if (action.payload.borrowsDetail) {
          state.borrowsDetail = action.payload.borrowsDetail;
        }
      })
      .addCase(getBorrowsDetail.rejected, (state) => {
        state.isGetBorrowsDetailFetching = false;
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
          // emit
          SOCKET.emit("newBorrow", action.payload.newBookBorrow);
          const { _id, user, book, duration, status, createdAt, updatedAt } =
            action.payload.newBookBorrow;
          // add to i borrows
          state.iBorrows.unshift({ _id, book, status });
          // add to borrows detail
          state.borrowsDetail.unshift({
            _id,
            user,
            book,
            duration,
            status,
            createdAt,
            updatedAt,
          });
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
      })
      // update borrow
      .addCase(updateBorrow.pending, (state) => {
        state.isBorrowUpdating = true;
      })
      .addCase(updateBorrow.fulfilled, (state, action) => {
        state.isBorrowUpdating = false;
        if (action.payload.updatedBorrow) {
          const { _id, book, status, updatedAt } = action.payload.updatedBorrow;
          SOCKET.emit("updateBorrow", action.payload.updatedBorrow);
          // borrows detail
          state.borrowsDetail[
            state.borrowsDetail.findIndex((br) => br._id === _id)
          ].status = status;
          state.borrowsDetail[
            state.borrowsDetail.findIndex((br) => br._id === _id)
          ].updatedAt = updatedAt;
          // add to i borrows
          if (state.iBorrows.findIndex((ib) => ib._id === _id) !== -1) {
            state.iBorrows[
              state.iBorrows.findIndex((ib) => ib._id === _id)
            ].status = status;
          }
          // top index
          const topIndex = state.borrows.findIndex(
            (borrow) => borrow.book === book
          );
          // second index
          const secondIndex = state.borrows[topIndex].borrows.findIndex(
            (br) => br._id === _id
          );
          state.borrows[topIndex].borrows[secondIndex].status = status;
          state.borrows[topIndex].borrows[secondIndex].updatedAt = updatedAt;
        }
      })
      .addCase(updateBorrow.rejected, (state) => {
        state.isBorrowUpdating = false;
      })
      // delete borrow
      .addCase(deleteBorrow.pending, (state) => {
        state.isBorrowDeleting = true;
      })
      .addCase(deleteBorrow.fulfilled, (state, action) => {
        state.isBorrowDeleting = false;
        if (action.payload.message === "borrow deleted successfully") {
          const { _id, book } = action.payload;
          SOCKET.emit("deleteBorrow",action.payload)
          // updates
          state.borrowsDetail = state.borrowsDetail.filter(
            (br) => br._id !== _id
          );
          // i borrows
          state.iBorrows = state.iBorrows.filter((ib) => ib.book !== book);
        }
      })
      .addCase(deleteBorrow.rejected, (state) => {
        state.isBorrowDeleting = false;
      });
  },
});

// exports
// actions
export const {
  resetIsNewBorrowUploadingDone,
  newBorrowEvent,
  updateBorrowEvent,
  deleteBorrowEvent,
} = borrowsSlice.actions;
// selectors
// borrows
export const borrowsSelector = (state: RootState) => state.borrows.borrows;
// borrows detail
export const borrowsDetailSelector = (state: RootState) =>
  state.borrows.borrowsDetail;
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
