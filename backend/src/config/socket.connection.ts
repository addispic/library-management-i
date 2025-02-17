import http from "http";
import express, { Express } from "express";
import { Server } from "socket.io";

// utils
// online users
import {
  getOnlineUsers,
  addNewOnlineUser,
  removeOnlineUser,
} from "../utils/online.users";

// app
const app: Express = express();

// server
const server = http.createServer(app);

// io
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

// connection
io.on("connection", (socket) => {
  // book
  // new book
  socket.on("newBook", (newBook) => {
    socket.broadcast.emit("newBookEvent", newBook);
  });
  // update book
  socket.on("updateBook", (updatedBook) => {
    socket.broadcast.emit("updateBookEvent", updatedBook);
  });
  // delete book
  socket.on("deleteBook",_id => {
    socket.broadcast.emit("deleteBookEvent",_id)
  })

  // borrows
  // new borrow
  socket.on("newBorrow",newBorrow => {
    socket.broadcast.emit("newBorrowEvent",newBorrow)
  })
  // update borrow
  socket.on("updateBorrow",updateBorrow => {
    socket.broadcast.emit("updateBorrowEvent",updateBorrow)
  })
  // delete borrow
  socket.on("deleteBorrow",deleteBorrow => {
    socket.broadcast.emit("deleteBorrowEvent",deleteBorrow)
  })

  // profile
  // new profile
  socket.on("newProfile", (newProfile) => {
    socket.broadcast.emit("newProfileEvent", newProfile);
  });
  // profile update
  socket.on("profileUpdate", (updatedProfile) => {
    socket.broadcast.emit("profileUpdateEvent", updatedProfile);
  });

  // users
  // new user signup
  socket.on("newUserSignup", (user) => {
    socket.broadcast.emit("newUserSignupEvent", user);
  });

  // user role update
  socket.on("userRoleUpdate",updatedUser => {
    socket.broadcast.emit("userRoleUpdateEvent",updatedUser)
  })

  // new online user
  socket.on("newOnlineUser", (user) => {
    addNewOnlineUser({ _id: user._id, id: socket.id });
    io.emit("getOnlineUsersEvent", getOnlineUsers());
  });
  // remove online user
  socket.on("removeOnlineUser", () => {
    removeOnlineUser(socket.id);
    io.emit("getOnlineUsersEvent", getOnlineUsers());
  });
  socket.on("disconnect", () => {
    removeOnlineUser(socket.id);
    io.emit("getOnlineUsersEvent", getOnlineUsers());
  });
});

// exports
export { server, app };
