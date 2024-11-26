import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useUser } from "./UserContext";
import Breadcrumb from "./Breadcrumb";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS Toastify

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const userId = user.id;

  const [product, setProduct] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const maxQuantity = selectedVersion ? selectedVersion.totalQuantity : 24;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:3005/product/products/${id}`,
        );
        setProduct(data);
        setSelectedVersion(data.versions[0]);

        if (data.supplier) {
          const supplierData = await axios.get(
            `http://localhost:3005/supplier/${data.supplier}`,
          );
          setSupplier(supplierData.data);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1);
  };

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
    setQuantity(1);
  };

  const addToCart = () => {
    if (userId && selectedVersion) {
      axios
        .post("http://localhost:3005/cart/add", {
          userId,
          productId: product._id,
          versionId: selectedVersion._id,
          versionName: selectedVersion.name,
          versionImage: selectedVersion.imageUrl,
          versionPrice: selectedVersion.price,
          quantity,
        })
        .then((response) => {
          if (response.data.success) {
            toast.success("🎉 Sản phẩm đã được thêm vào giỏ hàng thành công!");
            navigate("/cart");
          } else {
            toast.error(response.data.message || "Lỗi thêm vào giỏ hàng");
            console.error("Error adding to cart:", response.data.message);
          }
        })
        .catch((error) => console.error("Error adding to cart:", error));
    } else {
      navigate("/login");
    }
  };

  const addToLikeList = () => {
    if (userId && selectedVersion) {
      axios
        .post("http://localhost:3005/likelist/add", {
          userId,
          productId: product._id,
          versionId: selectedVersion._id,
          versionName: selectedVersion.name,
          versionPrice: selectedVersion.price,
          versionImage: selectedVersion.imageUrl,
        })
        .then((response) => {
          if (response.data.success) {
            toast.success(
              liked
                ? "🎉 Sản phẩm đã được gỡ khỏi danh sách yêu thích!"
                : "🎉 Sản phẩm đã được thêm vào danh sách yêu thích!",
            );
            setLiked(true);
            navigate("/likelist");
          } else {
            toast.error(
              response.data.message || "Lỗi thêm vào danh sách yêu thích",
            );
            console.error("Error adding to likelist:", response.data.message);
          }
        })
        .catch((error) => console.error("Error adding to likelist:", error));
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-2xl text-red-500">Lỗi tải dữ liệu</h1>
        <p>Vui lòng thử lại sau.</p>
      </div>
    );
  }

  if (!product || !selectedVersion) return null;

  return (
    <div className="bg-slate-100 py-10">
      <div className="mx-auto mb-[-5px] mt-[-40px] w-4/5">
        <Breadcrumb productName={selectedVersion.name} />{" "}
      </div>
      <div className="mx-auto flex w-4/5 flex-wrap overflow-hidden rounded-lg bg-white shadow-md lg:flex-nowrap">
        <div className="p-4 lg:w-1/3">
          <img
            loading="lazy"
            className="w-full rounded-lg"
            src={selectedVersion.imageUrl}
            alt={selectedVersion.name}
          />
        </div>
        <div className="px-8 py-6 lg:w-2/5">
          <h1 className="text-2xl font-bold">{selectedVersion.name}</h1>
          <h2 className="mt-2 border-b-2 border-gray-200 pb-2 text-xl text-red-600">
            {selectedVersion.price}₫
          </h2>
          <div className="mt-4 text-sm text-gray-500">
            <span className="mr-2 hover:text-[#ffd040]">
              <span className="flex items-center gap-1 text-yellow-500">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </span>{" "}
              Dựa trên 0 đánh giá.
            </span>
            <span className="mr-1">/</span>
            <a
              href="#"
              className="text-gray-500 hover:text-[#ffd040]"
              onClick={(e) => {
                e.preventDefault();
                console.log("Chức năng viết đánh giá chưa được thực hiện");
              }}
            >
              Viết đánh giá
            </a>
          </div>
          <div className="mt-4 flex items-center">
            <button
              onClick={decrementQuantity}
              className="h-8 rounded bg-gray-200 px-3"
              aria-label="Giảm số lượng"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="mx-2 flex h-8 w-12 justify-center rounded border pl-5"
            />
            <button
              onClick={incrementQuantity}
              className="h-8 rounded bg-gray-200 px-3"
              aria-label="Tăng số lượng"
            >
              +
            </button>
            <button
              onClick={addToCart}
              className="ml-2 h-8 rounded bg-yellow-500 px-4 py-1 text-white transition-all hover:bg-yellow-600"
            >
              <FontAwesomeIcon icon={faBagShopping} className="pr-2" />
              Thêm vào giỏ
            </button>
            <button
              onClick={addToLikeList}
              className={`ml-5 h-8 rounded px-2 py-1 ${
                liked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
              } hover:bg-[#ffd040] hover:text-white`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
          {quantity === maxQuantity && (
            <p className="mt-4 text-sm text-blue-700">
              Số lượng tối đa cho phiên bản này là {maxQuantity}.
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {product.versions.map((version) => (
              <button
                key={version._id}
                onClick={() => handleVersionSelect(version)}
                className={`rounded px-2 py-1 ${
                  selectedVersion._id === version._id
                    ? "bg-[#ffd040] text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {version.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 w-4/5 rounded-lg bg-white p-4 shadow">
        <h3 className="mb-4 text-lg font-semibold">Đánh giá khách hàng</h3>
        <div className="flex items-center gap-1 text-yellow-500">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
        <p className="mt-2 text-gray-600">Sản phẩm rất tốt! Đáng giá tiền!</p>
        <div className="mt-4">
          <p className="font-medium text-gray-700">Người dùng: Nguyễn Văn A</p>
          <p className="text-sm text-gray-500">Ngày đánh giá: 25/11/2024</p>
        </div>
      </div>
      {supplier && (
        <div className="mx-auto mt-5 w-4/5 rounded-lg bg-gray-50 p-4 shadow">
          <h3 className="mb-2 text-lg font-semibold">Nhà cung cấp</h3>
          <div
            className="flex cursor-pointer items-center"
            onClick={() => navigate(`/supplier/${supplier._id}`)}
          >
            <img
              loading="lazy"
              src={supplier.image}
              alt={supplier.username}
              className="mr-4 h-12 w-12 rounded-full"
            />
            <p className="text-base">{supplier.username}</p>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default DetailProduct;
