import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
// import Slider from "../../components/Slider";
import axios from "axios";

import db from "../../utils/db";
import { Store } from "../../utils/Store";
import { toast } from "react-toastify";

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);

  const router = useRouter();

  if (!product) {
    return (
      <Layout title="not found!">
        <div className="text-xl  flex justify-center mt-20 text-gray-900 dark:text-gray-200">
          محصول مورد نظر یافت نشد
        </div>
      </Layout>
    );
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("متاسفانه موجودی این محصول به اتمام رسیده");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout title={product.name}>
      <div className="py-2 border border-white-200 rounded-2xl p-2 w-max mb-5 text-gray-900 dark:text-gray-200 ">
        <Link href="/" className=""> بازگشت به صفحه محصولات </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3 text-gray-900 dark:text-gray-200">
        <div className=" md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>دسته بندی: {product.category}</li>
            <li> برند: {product.brand}</li>
            <li>
              {" "}
              امتیاز: {product.rating} از {product.numReviews}
            </li>
            <li> توضیحات: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>قیمت</div>
              <div>{product.price} تومان</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div> موجودی انبار</div>
              <div>
                {product.countInStock > 0 ? product.countInStock : "موجود نیست"}
              </div>
            </div>
            <button
              onClick={addToCartHandler}
              className="primary-button w-full text-black"
            >
              اضافه کردن به کارت
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
