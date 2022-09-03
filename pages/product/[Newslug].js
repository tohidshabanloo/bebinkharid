// import Image from "next/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import Router, { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
// import Slider from "../../components/Slider";
import dataNew from "../../utils/dataNew";
import { Store } from "../../utils/Store";

export default function ProductScreen() {
  const { state, dispatch } = useContext(Store);
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = dataNew.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>محصول مورد نظر یافت نشد!</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("متاسفانه تعداد درخواستی در انبار موجود نمی باشد");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <Layout title={product.name}>
      <div className="py-2 border border-white-200 rounded-2xl p-2 w-max mb-5 ">
        <Link href="/"> بازگشت به صفحه محصولات </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className=" md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
          {/* <Slider /> */}
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
