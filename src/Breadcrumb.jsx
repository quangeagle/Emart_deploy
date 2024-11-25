import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ productName }) {
  return (
    <nav className="rounded-lg bg-gray-100 px-4 py-3" aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-yellow-500"
          >
            Trang chủ
          </Link>
        </li>
        <li className="text-sm text-gray-400">/</li>
        <li>
          <span className="text-sm font-medium text-gray-800">
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
