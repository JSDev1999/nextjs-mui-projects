import mongoose from "mongoose";

async function dbConnect() {
  await mongoose
    .connect("mongodb+srv://ramesh:ramesh7337@cluster0.gr728o1.mongodb.net/appointment", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("DB connected to app", res);
      return res;
    })
    .catch((err) => {
      //   console.log("process.env.MONGODB_URI===>", process.env.MONGODB_URI);
      console.log("db err", err);
    });
}

export default dbConnect;
