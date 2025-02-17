import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// config
import { SOCKET } from "./config";

// hooks
import { useAppDispatch, useAppSelector } from "./hooks";
// slices
// users
import {
  checkingAuthenticationSelector,
  isUserAuthenticated,
  isUsersFetchingSelector,
  userSelector,
  getUsers,
  setOnlineUsers,
  newUserSignupEvent,
  userRoleUpdateEvent,
} from "./features/users/usersSlice";
// profiles
import {
  getProfiles,
  newProfileEvent,
  profileUpdateEvent,
  isProfilesFetchingSelector,
} from "./features/profiles/profilesSlice";
// books
import {
  getBooks,
  newBookEvent,
  updateBookEvent,
  deleteBookEvent,
  isBooksFetchingSelector,
} from "./features/books/booksSlice";
// borrows
import {
  getBorrows,
  getIBorrows,
  getBorrowsDetail,
  newBorrowEvent,
  updateBorrowEvent,
  deleteBorrowEvent,
  isBorrowsFetchingSelector,
  isIBorrowsFetchingSelector,
} from "./features/borrows/borrowsSlice";
// pages
import PrivateRoutes from "./pages/PrivateRoutes";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Actions from "./pages/Actions";
import Member from "./pages/Member";
export default function App() {
  // states
  // slices
  // users
  const checkingAuthentication = useAppSelector(checkingAuthenticationSelector);
  const user = useAppSelector(userSelector);
  const isUsersFetching = useAppSelector(isUsersFetchingSelector)
  const isProfilesFetching = useAppSelector(isProfilesFetchingSelector);
  const isBooksFetching = useAppSelector(isBooksFetchingSelector);
  const isBorrowsFetching = useAppSelector(isBorrowsFetchingSelector);
  const isIBorrowsFetching = useAppSelector(isIBorrowsFetchingSelector);
  // hooks
  const dispatch = useAppDispatch();

  // effects
  useEffect(() => {
    dispatch(isUserAuthenticated());
  }, []);
  useEffect(() => {
    if (user) {
      dispatch(getUsers());
      dispatch(getProfiles());
      dispatch(getBooks());
      dispatch(getBorrows());
      dispatch(getIBorrows());
      dispatch(getBorrowsDetail());

      // socket
      // books
      SOCKET.on("newBookEvent", (newBook) => {
        dispatch(newBookEvent(newBook));
      });
      SOCKET.on("updateBookEvent", (updatedBook) => {
        dispatch(updateBookEvent(updatedBook));
      });
      SOCKET.on("deleteBookEvent", (_id) => {
        dispatch(deleteBookEvent(_id));
      });
      // borrows
      SOCKET.on("newBorrowEvent", (newBorrow) => {
        dispatch(newBorrowEvent(newBorrow));
      });
      SOCKET.on("updateBorrowEvent", (updateBorrow) => {
        dispatch(updateBorrowEvent(updateBorrow));
      });
      SOCKET.on("deleteBorrowEvent", (deleteBorrow) => {
        dispatch(deleteBorrowEvent(deleteBorrow));
      });
      // users
      SOCKET.on("getOnlineUsersEvent", (data) => {
        dispatch(setOnlineUsers(data));
      });
      SOCKET.on("newUserSignupEvent", (user) => {
        dispatch(newUserSignupEvent(user));
      });
      SOCKET.on("userRoleUpdateEvent", (updatedUser) => {
        dispatch(userRoleUpdateEvent(updatedUser));
      });
      // profiles
      SOCKET.on("newProfileEvent", (newProfile) => {
        dispatch(newProfileEvent(newProfile));
      });
      SOCKET.on("profileUpdateEvent", (updatedProfile) => {
        dispatch(profileUpdateEvent(updatedProfile));
      });
    }
  }, [user]);
  if (
    checkingAuthentication ||
    isProfilesFetching ||
    isBooksFetching ||
    isBorrowsFetching ||
    isIBorrowsFetching || isUsersFetching
  )
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div>
          <div className="circles">
            <div
              className="circle"
              style={
                {
                  "--color": "#10e310",
                  "--delay": "-1.2s",
                } as React.CSSProperties
              }
            />
            <div
              className="circle"
              style={
                {
                  "--color": "#f4f716",
                  "--delay": "-1s",
                } as React.CSSProperties
              }
            />
            <div
              className="circle"
              style={
                {
                  "--color": "#f71616",
                  "--delay": "-0.8s",
                } as React.CSSProperties
              }
            />
            <div
              className="circle"
              style={
                {
                  "--color": "#1631f7",
                  "--delay": "-0.6s",
                } as React.CSSProperties
              }
            />
            <div
              className="circle"
              style={
                {
                  "--color": "#f716f0",
                  "--delay": "-0.4s",
                } as React.CSSProperties
              }
            />
          </div>
          <h3 className="mt-3 flex items-center justify-center font-black text-sm text-neutral-400">
            Loading...
          </h3>
        </div>
      </div>
    );
  return (
    <div className="w-screen h-screen overflow-hidden bg-neutral-100">
      <Routes>
        <Route path="/authentication" element={<Authentication />}></Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/my-books" element={<Home />}></Route>
          <Route path="/my-favorites" element={<Home />}></Route>
          <Route path="/actions" element={<Actions />}></Route>
          <Route path="/members" element={<Member />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
