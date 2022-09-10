/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";

import Slider from "./Slider";

const ProductItemImages = ({ product }) => {
  const data = {
    products: [
      {
        name: "تی شرت جوتی  مردانه برند پی لس ",
        slug: "free-shirt",
        category: "Shirts",
        image: "/images/shirt1.jpg",
        price: 70000,
        brand: "Brand Payless",
        rating: 4.5,
        numReviews: 8,
        countInStock: 20,
        description: "A popular shirt",
        image2: "/images/shirt1.jpg",
        image3: "/images/shirt2.jpg",
        image4: "/images/shirt3.jpg",
      },
      {
        name: " برند پی لس پیراهن مردانه جوتی جینز",
        slug: "fit-shirt",
        category: "Shirts",
        image: "/images/shirt2.jpg",
        price: 220000,
        brand: "JootiJeans",
        rating: 3.2,
        numReviews: 10,
        countInStock: 20,
        description: "A popular shirt",
      },
      {
        name: " برند پی لس پیراهن مردانه جوتی جینز",
        slug: "fit-shirt",
        category: "Shirts",
        image: "/images/shirt2.jpg",
        price: 220000,
        brand: "JootiJeans",
        rating: 3.2,
        numReviews: 10,
        countInStock: 20,
        description: "A popular shirt",
      },
      {
        name: "پولوشرت مردانه جوتی جینز",
        slug: "slim-shirt",
        category: "Shirts",
        image: "/images/shirt3.jpg",
        price: 339000,
        brand: "Raymond",
        rating: 4.5,
        numReviews: 3,
        countInStock: 20,
        description: "A popular shirt",
      },
      {
        name: "شلوار جین مردانه جوتی جینز",
        slug: "golf-pants",
        category: "Pants",
        image: "/images/pants1.jpg",
        price: 1279000,
        brand: "Oliver",
        rating: 2.9,
        numReviews: 13,
        countInStock: 20,
        description: "Smart looking pants",
      },
    ],
  };

  return (
    <div className="card">
      <Slider>
              <Link >
                <SwiperSlide>
                  <Image
                    src={product.image2}
                    alt={product.name}
                    width={640}
                    height={640}
                    layout="responsive"
                  ></Image>
                </SwiperSlide>
                <SwiperSlide>
                  <Image
                    src={product.image3}
                    alt={product.name}
                    width={640}
                    height={640}
                    layout="responsive"
                  ></Image>
                </SwiperSlide>
              </Link>
     
      </Slider>
    </div>
  );
};

export default ProductItemImages;
