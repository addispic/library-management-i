require("dotenv").config();
import { urlencoded, json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// socket
import { server, app } from "./config/socket.connection";

// db
import { dbConnectionHandler } from "./config/db.connection";

// middlewares
// users
import { privateRoutes } from "./middlewares/users.middleware";

// routes
// users
import usersRoutes from "./routes/users.routes";
// profiles
import profilesRoutes from "./routes/profiles.routes";
// books
import booksRoutes from "./routes/books.routes";
// borrow
import borrowRoutes from "./routes/borrow.routes";

// port
const PORT = process.env.PORT || 5000;

// middlewares
// normal
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// routes
// users
app.use("/api/users", usersRoutes);
// profiles
app.use("/api/profiles", privateRoutes(), profilesRoutes);
// books
app.use("/api/books", privateRoutes(), booksRoutes);
// borrow
app.use("/api/borrows",privateRoutes(),  borrowRoutes);

// listening
server.listen(PORT, async () => {
  await dbConnectionHandler();
  console.log(`server running at http://localhost:${PORT}`);
});
