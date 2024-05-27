import mongoose from "mongoose";
// database connection
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

// connect to database
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected.");
    return;
  }
  try {
    //setting up the connection
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
    console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log("connected");
  } catch (err) {
    console.log(err);
    process.exit(1);

    //  If we don't exit the process, the server will keep running and the user will not know that the server is not connected to the database.
  }
}
export default dbConnect;
