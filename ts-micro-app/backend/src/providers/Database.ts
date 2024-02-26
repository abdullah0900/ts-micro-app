import mongoose from 'mongoose';
import config from "config";

const dbURI = 'mongodb://'
                .concat(config.get("db.user"))
                .concat(`:${config.get("db.pass")}@`)
                .concat(config.get("db.host"))
                .concat(`:${config.get("db.port")}`);

async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to database.");
  } catch (error) {
    console.log("Cannot connect to database.", error);
    process.exit(1);
  }
}
  
  export default connectDB
