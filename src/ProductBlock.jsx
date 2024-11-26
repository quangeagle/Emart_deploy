import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductBlock = ({ product }) => {
  const { _id, name, price, newPrice, imageUrl, discount, versions } = product;

  // Lấy giá của phiên bản đầu tiên nếu có
  const versionPrice =
    versions && versions.length > 0 ? versions[0].price : price;

  // Tính toán phần trăm khuyến mãi
  const discountPercentage =
    versionPrice && newPrice
      ? Math.round(((versionPrice - newPrice) / versionPrice) * 100)
      : 0;

  return (
    <Link to={`/product/${_id}`}>
      <div className="relative ml-6 flex flex-1 flex-col pl-7 transition-shadow duration-300 hover:shadow-2xl">
        {/* Phần khuyến mãi */}
        {discountPercentage > 0 && (
          <div className="absolute right-2 top-2 flex h-8 w-20 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {discountPercentage}% Discount
          </div>
        )}
        <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-center text-sm font-medium text-gray-800 group-hover:text-gray-900">
          {name}
        </h3>
        <div className="mt-3 flex flex-row">
          {newPrice ? (
            <>
              <p className="text-xs">
                <span className="line-through">{versionPrice}</span>
              </p>
              <p className="ml-2 text-red-500">{newPrice}</p>
            </>
          ) : (
            <p className="text-xs">{versionPrice}</p>
          )}
          <p className="ml-2 block text-slate-400 hover:text-[#ffd040]">
            <FontAwesomeIcon icon={faHeart} className="text-current" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductBlock;
