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
  userSelector,
  getUsers,
  setOnlineUsers,
  newUserSignupEvent
} from "./features/users/usersSlice";
// profiles
import { getProfiles, newProfileEvent,profileUpdateEvent } from "./features/profiles/profilesSlice";
// books
import { getBooks , newBookEvent, updateBookEvent,deleteBookEvent} from "./features/books/booksSlice";
// pages
import PrivateRoutes from "./pages/PrivateRoutes";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
export default function App() {
  // states
  // slices
  // users
  const checkingAuthentication = useAppSelector(checkingAuthenticationSelector);
  const user = useAppSelector(userSelector);
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

      // socket
      // books
      SOCKET.on("newBookEvent",newBook => {
        dispatch(newBookEvent(newBook))
      })
      SOCKET.on("updateBookEvent",updatedBook => {
        dispatch(updateBookEvent(updatedBook))
      })
      SOCKET.on("deleteBookEvent",_id => {
        dispatch(deleteBookEvent(_id))
      })
      // users
      SOCKET.on("getOnlineUsersEvent", (data) => {
        dispatch(setOnlineUsers(data))
      });
      SOCKET.on("newUserSignupEvent",user => {
        dispatch(newUserSignupEvent(user))
      })
      // profiles
      SOCKET.on("newProfileEvent",newProfile => {
        dispatch(newProfileEvent(newProfile))
      })
      SOCKET.on("profileUpdateEvent",updatedProfile => {
        dispatch(profileUpdateEvent(updatedProfile))
      })
    }
  }, [user]);
  if (checkingAuthentication) return <div>Authenticating...</div>;
  return (
    <div className="w-screen h-screen overflow-hidden bg-neutral-100">
      <Routes>
        <Route path="/authentication" element={<Authentication />}></Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/my-books" element={<Home />}></Route>
          <Route path="/my-favorites" element={<Home />}></Route>
          <Route path="/i-borrowed" element={<Home />}></Route>
          <Route path="/members" element={<Home />}></Route>
        </Route>
      </Routes>
    </div>
  );
}
