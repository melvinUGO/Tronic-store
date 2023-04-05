import Product from "@/components/Product";
import { connectDB } from "@/lib/mongoose";
import { useState } from "react";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";
import Main from "@/components/Main";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  const categories = [...new Set(products?.map((product) => product.category))];

  if (phrase) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(phrase)
    );
  }

  return (
    <Layout className="p-5">
      <Main />
      <input
        type="text"
        placeholder="Search for products..."
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        className="bg-gray-100 w-full py-2 px-4 rounded-xl"
      />
      <div>
        {categories.map((category, index) => {
          return (
            <div key={index}>
              {products.find((product) => product.category === category) && (
                <div className="py-5 pt-10">
                  <h2 className="text-2xl capitalize py-3">{category}</h2>
                  <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                    {products
                      .filter((p) => p.category === category)
                      .map((product, index) => {
                        return (
                          <div key={index} className=" px-5 snap-start">
                            <Product {...product} />
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await connectDB();
  const products = await findAllProducts();
  console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
