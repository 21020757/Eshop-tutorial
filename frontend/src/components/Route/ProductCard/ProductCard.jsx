import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain mb-2 "
          />
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 25 ? data.name.slice(0, 25) + "..." : data.name}
          </h4>

          <div className="py-2 items-center justify-between">
            <div className="">
              <h5 className={`${styles.productDiscountPrice}`}>
                {(data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice
                ).toLocaleString("vi-VN")}
                VNĐ
              </h5>
              <h4 className={`${styles.price}`}>
                {(data.originalPrice
                  ? data.originalPrice
                  : null
                ).toLocaleString("vi-VN") + " VNĐ"}
              </h4>
            </div>
            <div className="flex">
              <span className="font-[400] text-sm mr-4">
                Đã bán {data?.sold_out}
              </span>
              <div>
                <Ratings rating={data?.ratings} />
              </div>
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center mt-3">
          <button
            className="flex items-center justify-center bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
            onClick={addToCartHandler}
            title="Thêm vào giỏ hàng"
          >
            Mua hàng
          </button>
          <button
            className="flex items-center justify-center bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
            onClick={() => setOpen(!open)}
            title="Thêm vào giỏ hàng"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
