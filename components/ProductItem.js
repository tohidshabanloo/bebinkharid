/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
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
  );
};

export default ProductItem;
