// import { decodeBase64 } from "bcryptjs";
import Link from "next/link";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Slider from "../components/Slider";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";

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

  let categoriesToFilterByman = ["man"];
  let filterSetman = new Set(categoriesToFilterByman);
  let filterForMan = products.filter((product) =>
    filterSetman.has(product.category)
  );

  return (
    <>
      <Layout title="فروشگاه اینترنتی ببین خرید">
        {/* original code */}
        <div className="bg-green-500 text-white  rounded-xl">
          <div className="flex p-3  justify-between">
            <h2>جدیدترین محصولات</h2>
            <button className="btn">
              <Link href="/latest" passHref>
                <h4>نمایش همه ...</h4>
              </Link>
            </button>
          </div>
          <div className="bg-white pt-1">
            <Slider>
              {products.map(
                (product, index) =>
                  index < 10 && (
                    <Link key={product.slug}>
                      <SwiperSlide>
                        <ProductItem
                          product={product}
                          addToCartHandler={addToCartHandler}
                        />
                      </SwiperSlide>
                    </Link>
                  )
              )}
            </Slider>
          </div>
        </div>
        <div className="bg-orange-500 text-white rounded-xl">
          <div className="flex p-3  justify-between">
            <h2> پرفروش ترین محصولات مردانه</h2>
            <button className="btn">
              <Link href="/latest" passHref>
                <h4>نمایش همه ...</h4>
              </Link>
            </button>
          </div>
          <div className="bg-white pt-1">
            <Slider>
              {filterForMan.map(
                (product, index) =>
                  index < 10 && (
                    <Link key={product.slug}>
                      <SwiperSlide>
                        <ProductItem
                          product={product}
                          addToCartHandler={addToCartHandler}
                        />
                      </SwiperSlide>
                    </Link>
                    <p>asdasdasdsad</p>
                  )
              )}
            </Slider>
          </div>
        </div>
        <div className="bg-pink-500 text-white rounded-xl">
          <div className="flex p-3  justify-between">
            <h2> پرفروش ترین محصولات زنانه</h2>
            <button className="btn">
              <Link href="/latest" passHref>
                <h4>نمایش همه ...</h4>
              </Link>
            </button>
          </div>
          <div className="bg-white pt-1">
            <Slider>
              {filterForWoman.map(
                (product, index) =>
                  index < 10 && (
                    <Link key={product.slug}>
                      <SwiperSlide>
                        <ProductItem
                          product={product}
                          addToCartHandler={addToCartHandler}
                        />
                      </SwiperSlide>
                    </Link>
                  )
              )}
            </Slider>
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
