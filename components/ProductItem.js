/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ProductItem = ({ product, addToCartHandler }) => {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg text-center">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2 text-orange-500">{product.brand}</p>
        <p className="text-green-700">{product.price} تومان</p>
        <button
          className="primary-button  text-black mt-5"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          اضافه کردن به کارت
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
