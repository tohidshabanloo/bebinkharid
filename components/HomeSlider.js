/* eslint-disable @next/next/no-img-element */

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
// import "./styles.css";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";

export default function HomeSlider() {
  return (
    <>
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/images/slides/s1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/slides/s2.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
