import { useState, useEffect } from "react";
import products from "./Api/Product.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Header from './header';
import Footer from './footer';
function ListProduct() {
  const [sortOption, setSortOption] = useState("default");
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const [favorites, setFavorites] = useState([]);
  const [hoveredHeart, setHoveredHeart] = useState(null); // State to determine hover on heart button

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const addToFavorites = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd && !favorites.some((item) => item.id === productId)) {
      setFavorites([...favorites, productToAdd]);
    }
  };

  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...products].sort((a, b) => {
        switch (sortOption) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "price-vote":
            return b.rating - a.rating;
          case "price-vote1":
            return a.rating - b.rating;
          case "best-seller":
            return b.sold - a.sold;
          default:
            return 0;
        }
      });
      setSortedProducts(sorted);
    };

    sortProducts();
  }, [sortOption]);

  return (
    <>
    <Header />
    <div className="bg-gray-100 min-h-screen">
   
      <div className="mx-20">
        <div className="p-5">
          <div className="flex">
            <ul className="text-none flex px-10 text-[11px] font-thin ">
              <li className="px-2 py-4 ">
                <a href="/" className="text-gray-500 hover:text-yellow-500">
                  TRANG CHỦ{" "}
                </a>
              </li>
              <li className="px-2 py-4">
                <a href="/" className="text-gray-500 hover:text-yellow-500">
                  BÁNH & THỰC PHẨM CHẾ BIẾN SẴN{" "}
                </a>
              </li>
              <li className="px-2 py-4">
                <a href="/" className="text-gray-500 hover:text-yellow-500">
                  BÁNH{" "}
                </a>
              </li>
              <li className="px-2 py-4 text-black">
                <a href="/" className="text-gray-500 hover:text-yellow-500">
                  BÁNH MẶN - NGỌT{" "}
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-10 flex bg-white justify-between items-center p-3 text-[13px]">
            <div className="font-bold text-1.5xl text-black">
              BÁNH MẶN - NGỌT
            </div>
            <div className="flex items-center">
              <div className="mr-2 text-black">Sắp xếp theo :</div>
              <select
                className="p-1 border rounded bg-white text-gray-500"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="default">Mặc định</option>
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
                <option value="price-desc">Giá thấp - cao</option>
                <option value="price-asc">Giá cao - thấp</option>
                <option value="price-vote">Bình chọn - cao nhất</option>
                <option value="price-vote1">Bình chọn - thấp nhất</option>
                <option value="best-seller">Bán chạy nhất</option>
              </select>
            </div>
          </div>
          <div className="mx-10 bg-white mt-1 cursor-pointer grid grid-cols-5 gap-0.5  ">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 rounded shadow transition duration-300 text-gray-500 hover:shadow-2xl"
              >
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center pl-2">
                  <div className="flex items-center">
                    <div className="voteStart mr-2 text-yellow-500 tracking-widest h-5">
                      {product.rating}
                    </div>
                  </div>
                  <div className="text-left justify-between items-center mb-2">
                    <div className="nameProduct font-thin mb-2 h-9 hover:text-amber-500 ">
                      {product.name}
                    </div>

                    <div className="flex justify-between items-center mt-10">
                      <div className="price font-bold text-[14px] text-black mt-1">
                        {product.price}
                      </div>
                      <button
                        className={`flex bg-white px-2 py-2 rounded-lg border-solid border-1 border-gray-500 duration-1000 relative ml-2 ${
                          hoveredHeart === product.id
                            ? " hover:bg-amber-500"
                            : "bg-amber-500"
                        }`}
                        onMouseEnter={() => setHoveredHeart(product.id)}
                        onMouseLeave={() => setHoveredHeart(null)}
                        onClick={() => addToFavorites(product.id)}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`${
                            hoveredHeart === product.id
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {favorites.length > 0 && (
            <div className="mx-10 mt-5">
              <h2 className="text-xl font-bold mb-3">Sản phẩm yêu thích:</h2>
              <div className="grid grid-cols-3 gap-4">
                {favorites.map((item) => (
                  <div key={item.id} className="border p-3">
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
}

export default ListProduct;
