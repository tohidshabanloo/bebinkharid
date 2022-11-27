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

  let categoriesToFilterBywoman = ["woman"];
  let filterSetwoman = new Set(categoriesToFilterBywoman);
  let filterForWoman = products.filter((product) =>
    filterSetwoman.has(product.category)
  );

  return (
    <>
      <Layout title="زنانه - فروشگاه اینترنتی ببین خرید">
        <h1 className="text-xl py-4 flex justify-center font-bold text-gray-900 dark:text-gray-200">
          تمامی محصولات زنانه
        </h1>
        {/* original code */}
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1 hidden lg:block text-gray-900 dark:text-gray-200">
            <ul>
              <h1 className="font-bold mb-6">دسته بندی محصولات</h1>
              <Link href="/shop" passHref>
                <h1 className="mr-2 font-bold cursor-pointer ">
                  - تمامی محصولات
                </h1>
              </Link>
              <ul>
                <ul className="mr-2 ">
                  <Link href="/shop/man" passHref>
                    <div className=" cursor-pointer">- مردانه </div>
                  </Link>
                </ul>
                <ul className="mr-2 text-green-500 ">- زنانه</ul>
              </ul>
            </ul>
          </div>

          <div className="grid col-span-5 lg:col-span-4  col-end-6 md:grid-cols-3 gap-2 ">
            {filterForWoman.map(
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
