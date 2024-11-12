import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperSection from './SwiperSection';
import ProductBlock from './ProductBlock';

import Footer from './footer';
import './app.css';

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
    axios.get('http://localhost:3005/product/approved')
      .then(res => {
        setProducts(res.data);
        setGroupedProducts(groupProducts(res.data, 5));
      })
      .catch(err => console.log(err));
  }, []);

  const swiperImages = [
    'logo2.png', 'logo3.png', 'logo10.png', 'logo4.png',
    'logo8.png', 'logo6.png', 'logo5.png'
  ];
  const categories = [
    { name: "Thời Trang Nam", icon: "/687f3967b7c2fe6a134a2c11894eea4b@resize_w320_nl.webp" },
    { name: "Điện Thoại & Phụ Kiện", icon: "/31234a27876fb89cd522d7e3db1ba5ca@resize_w320_nl.webp" },
    { name: "Thiết Bị Điện Tử", icon: "/978b9e4cb61c611aaaf58664fae133c5@resize_w320_nl.webp" },
    { name: "Máy Tính & Laptop", icon: "/c3f3edfaa9f6dafc4825b77d8449999d@resize_w320_nl.webp" },
    { name: "Máy Ảnh & Máy Quay Phim", icon: "https://path/to/icon5.png" },
    { name: "Đồng Hồ", icon: "https://path/to/icon6.png" },
    { name: "Giày Dép Nam", icon: "https://path/to/icon7.png" },
    { name: "Thiết Bị Điện Gia Dụng", icon: "https://path/to/icon8.png" },
    { name: "Thể Thao & Du Lịch", icon: "https://path/to/icon9.png" },
    { name: "Ô Tô & Xe Máy & Xe Đạp", icon: "https://path/to/icon10.png" },
    { name: "Thời Trang Nữ", icon: "https://path/to/icon11.png" },
    { name: "Mẹ & Bé", icon: "https://path/to/icon12.png" },
    { name: "Nhà Cửa & Đời Sống", icon: "https://path/to/icon13.png" },
    { name: "Sắc Đẹp", icon: "https://path/to/icon14.png" },
    { name: "Sức Khỏe", icon: "https://path/to/icon15.png" },
    { name: "Giày Dép Nữ", icon: "https://path/to/icon16.png" },
    { name: "Túi Ví Nữ", icon: "https://path/to/icon17.png" },
    { name: "Phụ Kiện & Trang Sức Nữ", icon: "https://path/to/icon18.png" },
    { name: "Bách Hóa Online", icon: "https://path/to/icon19.png" },
    { name: "Nhà Sách Online", icon: "https://path/to/icon20.png" }
];

  return (
    <>
      <div className='bg-slate-100 '>
        <div className='mr-32 ml-32 mt-2'>
        <SwiperSection images={swiperImages} />
        </div>
       

        <div className='mr-32 ml-32 mt-24'>
          {/* Image cards at the top */}
          <div className='h-52 mt-10 flex justify-between mb-10'>
            {["sale1.jpg", "sale2.jpg", "sale3.jpg"].map((imgSrc, idx) => (
              <div key={idx} className='relative w-96 h-52 overflow-hidden rounded-lg border border-gray-300'>
                <img src={imgSrc} className='transition-transform transform hover:scale-110 hover:opacity-50' />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
                  {idx === 0 ? "NO BRAND" : idx === 1 ? "NÔNG SẢN SẠCH" : "CHỈ CÓ TRÊN EMART"}
                </div>
              </div>
            ))}
          </div>
          <div className='bg-white mb-4 '>
  <div className="mb-10 pt-5 pl-6 pb-4 font-bold text-xl border-b-4">
     CÁC SẢN PHẨM HIỆN ĐANG CUNG CẤP 
  
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
    {categories.map((category, index) => (
      <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg" key={index}>
        <img src={category.icon} alt={category.name} className="w-16 h-16 mb-2" />
        <p className="text-center text-sm font-medium">{category.name}</p>
      </div>
    ))}
  </div>
</div>
          {/* First product slider */}
          <div className='h-auto bg-white'>
            <div className='mb-10 pt-5 pl-6 pb-4 font-bold text-xl border-b-4'>
              SẢN PHẨM BÁN CHẠY
            </div>
            <div className="h-auto">
              <div className="swiper-container w-full h-auto group">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {groupedProducts.map((productGroup, index) => (
                    <SwiperSlide key={index} className="flex flex-row items-center bg-white text-black text-lg">
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
        <div className='h-[330px] bg-white mt-9 mx-32 mb-24'>
  <div className=' pt-5 pl-6 pb-4 font-bold text-xl border-b-4'>
    SẢN PHẨM BÁN CHẠY
  </div>
  <div className='flex flex-row'>
    <div className=''>
      <img 
        src="sale4.jpg" 
        className="w-72 object-cover border border-gray-300" 
      />
    </div>
    <div className=' grid grid-cols-4 gap-4'>
      {products.slice(0, 4).map(product => (
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




// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import ProductBlock from './ProductBlock';


// const Home = () => {
//   const [get, setProduct] = useState([])
//   useEffect(() => {
//     axios.get('http://localhost:3004/product/get')
//     .then(res => {
//       setProduct(res.data)
//       console.log(res.data)
//     }).catch(err => console.log(err))
//   } , [])
//   return (
//     <div className='book-list'>
//       {
//         get.map(product => {
//           return <ProductBlock key={product.id} product = {product} ></ProductBlock>
//         })
//       }
//     </div>
//   )
// }

// export default Home
