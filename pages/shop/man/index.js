/* eslint-disable @next/next/no-img-element */
// import { decodeBase64 } from "bcryptjs";
import Link from "next/link";
import { useContext } from "react";
import Layout from "../../../components/Layout";

import Product from "../../../models/Product";
import db from "../../../utils/db";
import { Store } from "../../../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";

// import data from "../utils/data";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("متاسفانه تعداد درخواستی در انبار موجود نمی باشد");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("محصول به سبد خرید اضافه شد");
  };

  let categoriesToFilterByman = ["man"];
  let filterSetman = new Set(categoriesToFilterByman);
  let filterForMan = products.filter((product) =>
    filterSetman.has(product.category)
  );

  return (
    <>
      <Layout title="مردانه - فروشگاه اینترنتی ببین خرید">
        {/* original code */}
        <h1 className="text-xl py-4 flex justify-center font-bold text-gray-900 dark:text-gray-200">
          تمامی محصولات مردانه
        </h1>
        <div className="grid md:grid-cols-6 gap-2 ">
          {filterForMan.map(
            (product, index) =>
              index < 50 && (
                <div className="card ">
                  <Link href={`/product/${product.slug}`}>
                    <a>
                      <img
                        src={product.image}
                        alt={product.name}
                        className=" rounded shadow"
                      />
                    </a>
                  </Link>
                  <div className="flex flex-col  items-center justify-center p-5  bg-gray-200 dark:bg-gray-800 rounded-b-xl">
                    <Link href={`/product/${product.slug}`}>
                      <a>
                        <h2 className="text-gray-800  dark:text-gray-200 text-xs text-center md:text-sm">
                          {product.name}
                        </h2>
                      </a>
                    </Link>
                    <p className="mb-2 text-orange-500 text-xs md:text-sm">
                      {product.brand}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 font-bold text-xs md:text-sm">
                      {product.price} تومان
                    </p>
                    <button
                      className="primary-button text-xs md:text-sm text-black mt-2"
                      type="button"
                      onClick={() => addToCartHandler(product)}
                    >
                      افزودن به سبد
                    </button>
                  </div>
                </div>
              )
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
