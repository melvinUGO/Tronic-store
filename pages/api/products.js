import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

export async function findAllProducts() {
  return Product.find({});
}

export default async function handle(req, res) {
  await connectDB();
  const ids = req.query;
  if (ids) {
    console.log(ids);
    const idsArray = ids.ids.split(",");
    console.log(idsArray);
    res.json(await Product.find({ _id: { $in: idsArray } }).exec());
  } else {
    res.json(await findAllProducts());
  }
}
