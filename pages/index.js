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
import HomeSlider from "../components/HomeSlider";
import HomeSliderMobile from "../components/HomeSliderMobile";

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
        <div className="hidden lg:block mb-4">
          <HomeSlider />
        </div>
        <div className="sm:hidden md:hidden lg:hidden block mb-4">
          <HomeSliderMobile />
        </div>
        <div className=" ">
          <div className="flex p-3 bg-gray-200 text-gray-800 dark:bg-gray-800  dark:text-gray-200 rounded-t-xl justify-between">
            <h2>جدیدترین محصولات</h2>
            <button className="btn">
              <Link href="/shop" passHref>
                <h4>نمایش همه ...</h4>
              </Link>
            </button>
          </div>

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
        <div className="">
          <div className="flex p-3 bg-gray-200 text-gray-800 dark:bg-gray-800  dark:text-gray-200 rounded-t-xl justify-between">
            <Link href="/shop/man" passHref>
              <div className="bg-red-500 p-2 rounded-lg text-white cursor-pointer">
                مردانه{" "}
              </div>
            </Link>
            <h2 className="mt-2"> پرفروش ترین محصولات مردانه</h2>
            <button className="btn">
              <Link href="/shop/man" passHref>
                <h4 className="bg-red-500 p-2 rounded-lg text-white">
                  نمایش همه ...
                </h4>
              </Link>
            </button>
          </div>
          <div className="">
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
                  )
              )}
            </Slider>
          </div>
        </div>
        <div className="">
          <div className="flex p-3 bg-gray-200 text-gray-800 dark:bg-gray-800  dark:text-gray-200 rounded-t-xl justify-between">
            <Link href="/shop/woman" passHref>
              <div className="bg-red-500 p-2 rounded-lg text-white cursor-pointer">
                زنانه{" "}
              </div>
            </Link>
            <h2 className="mt-2"> پرفروش ترین محصولات زنانه</h2>
            <button className="btn">
              <Link href="/shop/woman" passHref>
                <h4 className="bg-red-500 p-2 rounded-lg text-white">
                  نمایش همه ...
                </h4>
              </Link>
            </button>
          </div>
          <div className="">
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
