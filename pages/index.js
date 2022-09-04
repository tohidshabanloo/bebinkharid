import { decodeBase64 } from "bcryptjs";
import Link from "next/link";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Slider from "../components/Slider";
import Slider2 from "../components/Slider 2";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
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

    if (product.countInStock < quantity) {
      return toast.error("متاسفانه تعداد درخواستی در انبار موجود نمی باشد");
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("محصول به سبد خرید اضافه شد");
  };
  return (
    <Layout title="فروشگاه اینترنتی ببین خرید">
      {/* original code */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
      <div className="bg-green-400 rounded-xl">
        <div className="flex p-3  justify-between">
          <h2>جدیدترین محصولات</h2>
          <button className="btn">
            <Link href="/latest" passHref>
              <h4>نمایش همه ...</h4>
            </Link>
          </button>
        </div>
        <div className="bg-white pt-1">
          <Slider />
        </div>
      </div>

      <div className="bg-red-200 rounded-xl">
        <div className="flex p-3  justify-between">
          <h2>پرفروش ترین محصولات</h2>
          <button className="btn">
            <Link href="/latest" passHref>
              <h4>نمایش همه ...</h4>
            </Link>
          </button>
        </div>
        <div className="bg-white pt-1">
          <Slider2 />
        </div>
      </div>
    </Layout>
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
