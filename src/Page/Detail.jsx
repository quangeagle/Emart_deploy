import { useParams } from "react-router-dom";
import products from "e:/emart/emart-hk3/emat/src/API/Product";

const Detail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow transition duration-300 text-gray-500">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-cover rounded"
        />
      </div>
      <h1 className="text-xl font-bold mt-4">{product.name}</h1>
      <p className="price text-red-500 text-lg font-semibold mt-2">
        {product.price}đ
      </p>
      <div className="mt-4">
        <button className="btn bg-yellow-500 text-white px-4 py-2 rounded mr-2">
          Thêm vào giỏ
        </button>
        <button className="btn bg-yellow-500 text-white px-4 py-2 rounded">
          Mua ngay
        </button>
      </div>
      <p className="stock-info text-gray-600 mt-2">
        Số lượng tối đa mua trong ngày là 10
      </p>
      <div className="description mt-4 text-gray-700">
        <p>Bánh được sản xuất và bán từ 10h mỗi ngày tại Emart...</p>
      </div>
    </div>
  );
};

export default Detail;
