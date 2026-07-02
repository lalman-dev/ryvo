const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error("DB URL not found!");
}

let cached = global.mongooseConn;
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {};

export default connectDB; 