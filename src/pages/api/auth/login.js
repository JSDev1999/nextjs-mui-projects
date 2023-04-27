import clientPromise from "src/utils/mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  switch (method) {
    case "POST":
      try {
        const results = await db.collection("posts").insertOne(req.body);

        res.status(200).json({ success: true, data: results });
      } catch (error) {
        res.status(400).json({ success: false });
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
