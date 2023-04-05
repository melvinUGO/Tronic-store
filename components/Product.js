import { ProductsContext } from "@/context/ProductsConctext";
import { useContext } from "react";

const Product = ({ _id, name, price, description, picture }) => {
  const { setSelectedProducts } = useContext(ProductsContext);

  function addProduct() {
    setSelectedProducts((prev) => [...prev, _id]);
  }

  return (
    <div className="w-64">
      <div className=" bg-blue-100 p-5 rounded-xl w-full h-[220px]">
        <img className=" w-full h-full object-contain " src={picture} alt="" />
      </div>
      <div className="mt-2">
        <h3 className="font-bold capitalize text-lg py-5">{name}</h3>
      </div>
      <p className="text-sm mt-1 leading-4 text-gray-500">{description}</p>
      <div className="flex mt-1">
        <div className="text-2xl font-bold grow">${price}</div>
        <button
          onClick={addProduct}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
