import { encryptPassword, getErrorMessage } from "src/utils/encodeDecode";
import clientPromise from "src/utils/mongodb";
import bcrypt from "bcrypt";
import { HttpStatus, Response } from "src/utils/Response";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (method) {
    case "POST":
      try {
        const { email, password, name } = req.body;

        const isUserExists = await db.collection("users").findOne({ email: email });
        if (isUserExists) {
          return res
            .status(HttpStatus.ALREADY_EXISTS.code)
            .json(
              new Response(
                HttpStatus.ALREADY_EXISTS.code,
                HttpStatus.ALREADY_EXISTS.status,
                "User Already Exists"
              )
            );
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        const results = await db.collection("users").insertOne({ ...req.body });

        return res
          .status(HttpStatus.CREATED.code)
          .json(
            new Response(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              "User Signup Successful",
              results
            )
          );
      } catch (error) {
        console.log(error);
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
