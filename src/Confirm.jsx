import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="mx-auto mt-20 max-w-4xl p-6 text-center">
      <h2 className="mb-4 text-3xl font-bold text-green-600">
        🎉 Đặt hàng thành công!
      </h2>
      <p className="mb-6 text-lg">
        Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được ghi nhận và chúng tôi
        sẽ sớm xử lý.
      </p>
      <div className="mt-6">
        <Link
          to="/"
          className="mr-4 rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Tiếp tục mua hàng
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
