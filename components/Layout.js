import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import { ProductsContext } from "@/context/ProductsConctext";

const Layout = ({ children }) => {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  }, []);

  return (
    <div>
      <div className="flex">
        <img className=" w-full h-[50vh]" src="/logo.png" alt="" />
        <div></div>
      </div>
      <div className="p-5 sm:p-16">
        {success && (
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thanks for your order!
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
