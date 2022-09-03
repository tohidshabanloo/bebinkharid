import Link from "next/link";
import Layout from "../components/Layout";
// import ProductItem from "../components/ProductItem";
import Slider from "../components/Slider";
import Slider2 from "../components/Slider 2";
// import data from "../utils/data";

export default function Home() {
  return (
    <Layout title="فروشگاه اینترنتی ببین خرید">
      {/* original code */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div> */}
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
