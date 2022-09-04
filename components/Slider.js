// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation } from "swiper";

const Slider = ({ children }) => {
  return (
    <>
      <Swiper
        navigation={{ clickable: true }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          300: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
          500: {
            slidesPerView: 2.5,
            spaceBetween: 5,
          },
          640: {
            slidesPerView: 3.5,
            spaceBetween: 6,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 8,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </>
  );
};
export default Slider;
