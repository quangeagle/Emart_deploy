// SwiperSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperSection = ({ images }) => {
  return (
    <div className="h-96 w-full">
      <Swiper
        cssMode={true}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper h-98 w-full group"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="h-98 bg-white">
            <img
              src={img}
              className="h-98 w-full object-fill"
              alt={`slide-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSection;
