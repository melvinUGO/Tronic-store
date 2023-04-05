const { default: mongoose, models } = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: Object,
    name: String,
    email: String,
    address: String,
    city: String,
    paid: { type: Number, defaultValue: 0 },
  },
  { timestamps: true }
);

const Order = models?.Order || mongoose.model("Order", OrderSchema);

export default Order;
