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

// Group products into chunks of a specified size
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
        setGroupedProducts(groupProducts(res.data, 5));
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
  const categories = [
    {
      name: "Thời Trang Nam",
      icon: "/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp",
    },
    {
      name: "Điện Thoại & Phụ Kiện",
      icon: "/31234a27876fb89cd522d7e3db1ba5ca@resize_w320_nl.webp",
    },
    {
      name: "Thiết Bị Điện Tử",
      icon: "/978b9e4cb61c611aaaf58664fae133c5@resize_w320_nl.webp",
    },
    {
      name: "Máy Tính & Laptop",
      icon: "/c3f3edfaa9f6dafc4825b77d8449999d@resize_w320_nl.webp",
    },
    {
      name: "Máy Ảnh & Máy Quay Phim",
      icon: "https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d@resize_w320_nl.webp",
    },
    {
      name: "Đồng Hồ",
      icon: "https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl.webp",
    },
    {
      name: "Giày Dép Nam",
      icon: "https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de@resize_w320_nl.webp",
    },
    {
      name: "Thiết Bị Điện Gia Dụng",
      icon: "https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857@resize_w320_nl.webp",
    },
    {
      name: "Thể Thao & Du Lịch",
      icon: "https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4@resize_w320_nl.webp",
    },
    {
      name: "Ô Tô & Xe Máy & Xe Đạp",
      icon: "https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334@resize_w320_nl.webp",
    },
    {
      name: "Thời Trang Nữ",
      icon: "https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d@resize_w320_nl.webp",
    },
    {
      name: "Mẹ & Bé",
      icon: "https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e@resize_w320_nl.webp",
    },
    {
      name: "Nhà Cửa & Đời Sống",
      icon: "https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f@resize_w320_nl.webp",
    },
    {
      name: "Sắc Đẹp",
      icon: "https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72@resize_w320_nl.webp",
    },
    {
      name: "Sức Khỏe",
      icon: "https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747@resize_w320_nl.webp",
    },
    {
      name: "Giày Dép Nữ",
      icon: "https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847@resize_w320_nl.webp",
    },
    {
      name: "Túi Ví Nữ",
      icon: "https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52@resize_w320_nl.webp",
    },
    {
      name: "Phụ Kiện & Trang Sức Nữ",
      icon: "https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e@resize_w320_nl.webp",
    },
    {
      name: "Bách Hóa Online",
      icon: "https://down-vn.img.susercontent.com/file/c432168ee788f903f1ea024487f2c889@resize_w320_nl.webp",
    },
    {
      name: "Nhà Sách Online",
      icon: "https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139@resize_w320_nl.webp",
    },
  ];

  return (
    <>
      <div className="bg-slate-100">
        <div className="ml-32 mr-32 mt-2">
          <SwiperSection images={swiperImages} />
        </div>

        <div className="ml-32 mr-32 mt-5">
          {/* Image cards at the top */}
          <div className="mb-10 mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center">
            {["sale1.jpg", "sale2.jpg", "sale3.jpg"].map((imgSrc, idx) => (
              <div
                key={idx}
                className="relative h-52 w-full sm:w-96 md:w-96 lg:w-96 overflow-hidden rounded-lg border border-gray-300"
              >
                <img
                  src={imgSrc}
                  className="transform transition-transform hover:scale-110 hover:opacity-50 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-center text-white">
                  {idx === 0
                    ? "NO BRAND"
                    : idx === 1
                      ? "NÔNG SẢN SẠCH"
                      : "CHỈ CÓ TRÊN EMART"}
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4 bg-white">
            <div className="mb-10 border-b-4 pb-4 pl-6 pt-5 text-xl font-bold">
              CÁC SẢN PHẨM HIỆN ĐANG CUNG CẤP
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {categories.map((category, index) => (
                <div
                  className="flex flex-col items-center rounded-lg bg-white p-4 shadow"
                  key={index}
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="mb-2 h-16 w-16"
                  />
                  <p className="text-center text-sm font-medium">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* First product slider */}
          <div className="h-auto bg-white">
            <div className=" border-b-4 pb-4 pl-6 pt-5 text-xl font-bold">
              SẢN PHẨM BÁN CHẠY
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

        {/* Second product section with image */}
        <div className="mx-32 mb-24 mt-9 h-[330px] bg-white">
          <div className="border-b-4 pb-4 pl-6 pt-5 text-xl font-bold">
            SẢN PHẨM BÁN CHẠY
          </div>
          <div className="flex flex-row">
            <div className="">
              <img
                src="sale4.jpg"
                className="w-72 border border-gray-300 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {products.slice(0, 4).map((product) => (
                <ProductBlock key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
