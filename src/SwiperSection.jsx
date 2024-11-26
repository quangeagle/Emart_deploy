import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles if needed

const SwiperSection = ({ images }) => {
  return (
    <div className="h-96 w-full">
      <Swiper
        cssMode={true}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        mousewheel={true}
        keyboard={true}
        autoplay={{
          delay: 3000, // Time in milliseconds between slides (3000ms = 3 seconds)
          disableOnInteraction: false, // Allows autoplay to continue after user interaction
        }}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]} // Include Autoplay module
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
