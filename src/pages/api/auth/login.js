import { HttpStatus, Response } from "src/utils/Response";
import clientPromise from "src/utils/mongodb";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const checkUser = await db.collection("users").findOne({ email: email });
        if (!checkUser) {
          return res
            .status(HttpStatus.BAD_REQUEST.code)
            .json(
              new Response(
                HttpStatus.BAD_REQUEST.code,
                HttpStatus.BAD_REQUEST.status,
                "Invalid Credentials"
              )
            );
        }

        const validPassword = await Bcrypt.compare(password, checkUser.password);
        if (validPassword) {
          const { password, ...others } = checkUser;
          const token = JWT.sign({ _id: others._id }, process.env.JWT_SECRET);
          const data = { ...others, token };

          return res
            .status(HttpStatus.OK.code)
            .json(new Response(HttpStatus.OK.code, HttpStatus.OK.status, "Login Successful", data));
        } else {
          return res
            .status(HttpStatus.BAD_REQUEST.code)
            .json(
              new Response(
                HttpStatus.BAD_REQUEST.code,
                HttpStatus.BAD_REQUEST.status,
                "Invalid Credentials"
              )
            );
        }
      } catch (error) {
        return res
          .status(HttpStatus.BAD_REQUEST.code)
          .json(
            new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, error.message)
          );
      }
    case "GET":
      try {
        const results = await db
          .collection("posts")
          .find({})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();
        res.status(200).json({ success: true, data: results });
      } catch (error) {
        res.status(400).json({ success: false, error: error?.message });
      }
  }
}
