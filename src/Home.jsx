import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperSection from "./SwiperSection";
import ProductBlock from "./ProductBlock";
import Footer from "./footer";
import "./app.css";

// Nhóm các sản phẩm thành các nhóm có kích thước nhất định
const groupProducts = (products, itemsPerGroup) => {
  let grouped = [];
  for (let i = 0; i < products.length; i += itemsPerGroup) {
    grouped.push(products.slice(i, i + itemsPerGroup));
  }
  return grouped;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/product/approved")
      .then((res) => {
        setProducts(res.data);
        setGroupedProducts(groupProducts(res.data, 5)); // Nhóm tất cả sản phẩm thành các nhóm 5 sản phẩm
      })
      .catch((err) => console.log(err));
  }, []);

  const swiperImages = [
    "logo2.png",
    "logo3.png",
    "logo10.png",
    "logo4.png",
    "logo8.png",
    "logo6.png",
    "logo5.png",
  ];

  const fillTopSellingProducts = (products, minItems) => {
    const filledProducts = [...products];
    while (filledProducts.length < minItems) {
      filledProducts.push({
        id: `placeholder-${filledProducts.length}`,
        name: "Sản phẩm trống",
        price: 0,
        imageUrl: "placeholder.png",
      });
    }
    return filledProducts;
  };

  // Giới hạn số lượng sản phẩm hiển thị là 8
  const topSellingProducts = fillTopSellingProducts(products.slice(0, 8), 3); // Hiển thị 8 sản phẩm đầu tiên

  console.log(topSellingProducts); // In ra console để kiểm tra xem sản phẩm có được tải đúng không

  return (
    <div className="bg-slate-100">
      <div className="ml-32 mr-32 mt-2">
        <SwiperSection images={swiperImages} />
      </div>

      <div className="ml-32 mr-32 mt-5">
        {/* Các thẻ hình ảnh ở trên */}
        <div className="mb-10 mr-[-40px] mt-10 grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3">
          {["sale1.jpg", "sale2.jpg", "sale3.jpg"].map((imgSrc, idx) => (
            <div
              key={idx}
              className="relative h-52 w-full overflow-hidden rounded-lg border border-gray-300 sm:w-96 md:w-96 lg:w-96"
            >
              <img
                src={imgSrc}
                className="mr-10 h-full w-full transform object-cover transition-transform hover:scale-110 hover:opacity-50"
              />
              <div className="absolute bottom-0 left-0 mr-10 w-full bg-black bg-opacity-50 p-2 text-center text-white">
                {idx === 0
                  ? "NO BRAND"
                  : idx === 1
                    ? "NÔNG SẢN SẠCH"
                    : "CHỈ CÓ TRÊN EMART"}
              </div>
            </div>
          ))}
        </div>

        {/* Slider sản phẩm đầu tiên */}
        <div className="h-auto bg-white">
          <div className="border-b-4 pb-4 pl-6 pt-5 text-xl font-bold">
            SẢN PHẨM SIÊU THỊ
          </div>
          <div className="h-auto">
            <div className="swiper-container h-auto w-full group">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {groupedProducts.map((productGroup, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex flex-row items-center bg-white text-lg text-black"
                  >
                    {productGroup.map((product) => (
                      <ProductBlock key={product.id} product={product} />
                    ))}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Phần sản phẩm bán chạy với hình ảnh */}
      <div className="mx-32 mb-24 mt-9 h-auto bg-white">
        <div className="border-b-4 pb-4 pl-6 pt-5 text-xl font-bold">
          SẢN PHẨM BÁN CHẠY
        </div>
        <div className="flex w-full">
          {/* Hình ảnh bên trái */}
          <div className="mr-8 h-96 w-80 flex-shrink-0">
            <img
              src="sale4.jpg"
              className="h-full w-full rounded-lg border border-gray-300 object-cover"
              alt="Sale"
            />
          </div>
          {/* Slider sản phẩm */}
          <div className="ml-[-20px] h-auto w-[70%]">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={3}
              spaceBetween={20}
            >
              {topSellingProducts.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductBlock key={product.id} product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
