import Link from "next/link";
import Layout from "../components/Layout";
// import ProductItem from "../components/ProductItem";
import Slider from "../components/Slider";
// import data from "../utils/data";

export default function Home() {
  return (
    <Layout title="فروشگاه ببین خرید">
      {/* original code */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div> */}
      <div className="flex p-3  justify-between">
        <h2>جدیدترین محصولات</h2>
        <button className="btn">
          <Link href="/latest" passHref>
            <h4>نمایش همه ...</h4>
          </Link>
        </button>
      </div>
      <Slider />
    </Layout>
  );
}
