import SaleNoti from "./assets/logoSaleNoti.png";

function Footer() {
  return (
    <footer className="relative bottom-0 w-full bg-gray-100 pt-9">
      <div className="flex w-full justify-center overflow-hidden bg-gray-700">
        <div className="flex w-4/5 justify-between text-white">
          <div>
            <ul className="mb-5 mt-5">
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Trung tâm hỗ trợ
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Quy trình giao dịch
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Trách nhiệm khi phát sinh lỗi kỹ thuật
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Chính sách bảo hành/ bảo trì
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Đăng nhập
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="mb-5 mt-5">
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Quy chế hoạt động
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Quy trình thanh toán
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Quản lý thông tin xấu
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Tải xuống ứng dụng
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="mb-5 mt-5">
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Giới thiệu
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Đảm bảo an toàn giao dịch
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Chính sách giao nhận - vận chuyểnn
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Lịch sử
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="mb-5 mt-5">
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Quy định chung
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Bảo vệ thông tin cá nhân
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Chính sách đổi/ trả/ hủy và hoàn tiền
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-white hover:text-yellow-400"
                  href="#"
                >
                  Sổ địa chỉ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center border-b border-gray-700 bg-gray-900 py-8 text-white">
        <div className="w-4/5 space-y-3">
          <img className="my-2 w-28" src={SaleNoti} alt="Công chứng logo" />
          <p className="text-sm">THISO RETAIL COMPANY LIMITED</p>
          <p className="text-xs font-bold">
            TÊN CÔNG TY : CÔNG TY TNHH THISO RETAIL
          </p>
          <p className="text-xs">Người đại diện : TRẦN BÁ DƯƠNG</p>
          <p className="text-xs">Mã số doanh nghiệp: 0316940306</p>
          <p className="text-xs">
            Giấy chứng nhận đăng ký doanh nghiệp số 0316940306 do Sở Kế hoạch và
            Đầu tư Thành phố Hồ Chí Minh cấp lần đầu ngày 15/07/2021.
          </p>
          <p className="text-xs">
            Giấy chứng nhận cơ sở đủ điều kiện ATTP số 3717/GCNATTP-BQLATTP do
            Ban Quản lý An Toàn Thực Phẩm Thành phố Hồ Chí Minh cấp ngày
            28/12/2021.
          </p>
          <p className="text-xs">
            Địa chỉ: 366 Phan Văn Trị, Phường 5, Quận Gò Vấp, Tp. HCM.
          </p>
          <p className="text-xs">DVKH: (028) 3622 4567</p>
          <p className="text-xs">Email: emartmall@emart.vn</p>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-900 py-4 text-gray-400">
        <div className="flex flex-col items-center">
          <p className="text-xs">BẢN QUYỀN CỦA EMART GO VAP © 2024</p>
          <div className="mt-2 flex space-x-6">
            <a className="text-xs hover:text-yellow-500" href="#">
              SƠ ĐỒ TRANG
            </a>
            <a className="text-xs hover:text-yellow-500" href="#">
              LIÊN HỆ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
