import Layout from "@/components/Layout";
import { ProductsContext } from "@/context/ProductsConctext";
import React, { useContext, useEffect, useState } from "react";

const checkout = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqueIds.join(","))
      .then((res) => res.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  const addQuantity = (id) => {
    setSelectedProducts((prev) => [...prev, id]);
  };

  const lessQuantity = (id) => {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  };

  const delevery = 5;
  let subTotal = 0;

  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price;
      subTotal += price;
    }
  }

  const total = subTotal + delevery;

  return (
    <Layout>
      {!productsInfos.length && <div>No products in your shopping cart</div>}
      {productsInfos.length &&
        productsInfos.map((productsInfo, index) => {
          return (
            <div key={index} className="flex mb-5">
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img className="w-24" src={productsInfo.picture} alt="" />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productsInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {productsInfo.description}
                </p>
                <div className="flex pt-5">
                  <div className="grow">{productsInfo.price}</div>
                  <div>
                    <button
                      onClick={() => lessQuantity(productsInfo._id)}
                      className=" border border-emerald-500  text-emerald-500  px-2 rounded-lg "
                    >
                      -
                    </button>
                    <span className="px-2">
                      {
                        selectedProducts.filter((id) => id === productsInfo._id)
                          .length
                      }
                    </span>
                    <button
                      onClick={() => addQuantity(productsInfo._id)}
                      className=" bg-emerald-500  text-white px-2 rounded-lg "
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <form action="/api/checkout" method="POST">
        <div className="mt-4">
          <input
            required
            className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            name="address"
            placeholder="Street address, number"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            required
            className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            name="city"
            placeholder="City and postal code"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            required
            className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="bg-gray-200 w-full rounded-lg px-4 py-2 mb-2"
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-500">Subtotal:</h3>
            <h3 className="font-bold">${subTotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow font-bold text-gray-500">Delivery:</h3>
            <h3 className="font-bold">${delevery}</h3>
          </div>
          <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
            <h3 className="grow font-bold text-gray-500">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>

        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />
        <button
          type="submit"
          className="bg-emerald-500 px-5 py-2 rounded-xl font-bold my-4 shadow-lg shadow-emerald-300 text-white w-full"
        >
          Pay ${total}{" "}
        </button>
      </form>
    </Layout>
  );
};

export default checkout;
