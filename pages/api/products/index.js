import dbConnect from "../../../lib/mongo";
import Product from "../../../models/Product";
import { getSession } from "next-auth/react";
const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();
  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    const session = await getSession({ req: req });
    console.log(session);

    if (!session) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
