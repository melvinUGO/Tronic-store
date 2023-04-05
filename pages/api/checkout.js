import { connectDB } from "@/lib/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== "POST") {
    res.json("should be a post");
    return;
  }

  const { email, name, address, city } = req.body;
  const productsIds = req.body.products.split(",");
  const uniqueIds = [...new Set(productsIds)];
  const products = await Product.find({ _id: { $in: uniqueIds } }).exec();

  let line_items = [];
  for (let productId of uniqueIds) {
    const quantity = productsIds.filter((id) => id === productId).length;
    const product = products.find((p) => p._id.toString() === productId);
    line_items.push({
      quantity,
      price_data: {
        currency: "USD",
        product_data: { name: product.name },
        unit_amount: product.price * 100,
      },
    });
  }

  const order = await Order.create({
    products: line_items,
    paid: 0,
    name,
    email,
    address,
    city,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    metadata: { orderId: order._id.toString() },
  });

  res.redirect(303, session.url);
}
