import React from "react";
import { useUser } from './UserContext';

function ConnectWallet() {
  // Dữ liệu cần thiết để gửi khi kết nối ví
  const partnerId = "673605ad7ff5d0a560628835"; // Thay thế bằng Partner ID của bạn
  const returnUrl = "http://localhost:5173/connect"; // URL sẽ quay lại sau khi kết nối ví
   // User ID - Thay thế bằng thông tin người dùng thực tế
  const { user } = useUser();
  const userId = user.id;

  const handleConnectWallet = () => {
    // URL được cấu hình để chuyển hướng
    const connectWalletUrl = `https://wallet.pointer.io.vn/connect-app?partnerId=${partnerId}&returnUrl=${encodeURIComponent(
      returnUrl
    )}&userId=${userId}`;

    // Chuyển hướng sang URL kết nối ví
    window.location.href = connectWalletUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Kết nối ví</h1>
      <p className="text-gray-600 mb-4">
        Nhấn nút bên dưới để kết nối ví của bạn. Bạn sẽ được chuyển đến trang kết nối.
      </p>
      <button
        onClick={handleConnectWallet}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
      >
        Kết nối ví
      </button>
    </div>
  );
}

export default ConnectWallet;
