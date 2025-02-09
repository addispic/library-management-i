import { connections, connect } from "mongoose";

// mongodb uri
const mongodb_uri = process.env.MONGODB_URI as string;

// db connection handler
const dbConnectionHandler = async () => {
  if (connections[0].readyState) return;
  try {
    await connect(mongodb_uri);
    console.log("db connected successfully");
  } catch (err) {
    console.log("db connection failed");
    process.exit(1);
  }
};

// exports
export { dbConnectionHandler };
