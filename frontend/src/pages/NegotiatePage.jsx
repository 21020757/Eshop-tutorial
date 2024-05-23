import React, { useState, useEffect } from "react";
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart, reset } from '../redux/actions/cart';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import styles from "../styles/styles";

export default function NegotiatePage() {
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/')
      }
    });
    const navigate = useNavigate()
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState(null);
    const [discountPrice, setDiscountPrice] = useState(null);
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const subTotalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    );
    const shipping = subTotalPrice * 0.1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = couponCode;

        await axios
            .get(`${server}/coupon/get-coupon-value/${name}`)
            .then((res) => {
                const productId = res.data.couponCode?.selectedProduct;
                const couponCodeValue = res.data.couponCode?.value;
                const min = res.data.couponCode?.minAmount;
                console.log(productId);
                if (res.data.couponCode !== null) {
                    const isCouponValid =
                        cart && cart.filter((item) => item._id === productId);
                    const isQuantityValid =
                        cart && cart.filter((item) => item.qty >= min);
                    if (isCouponValid.length === 0) {
                        toast.error("Sản phẩm không hợp lệ");
                        setCouponCode("");
                    } else if (isQuantityValid.length === 0) {
                        toast.error("Số lượng không đủ để sử dụng mã");
                        setCouponCode("");
                    } else {
                        const eligiblePrice = isCouponValid.reduce(
                            (acc, item) => acc + item.qty * item.discountPrice,
                            0
                        );
                        const discountPrice = (eligiblePrice * couponCodeValue) / 100;
                        setDiscountPrice(discountPrice);
                        setCouponCodeData(res.data.couponCode);
                        setCouponCode("");
                    }
                }
                if (res.data.couponCode === null) {
                    toast.error("Mã giảm giá không tồn tại!");
                    setCouponCode("");
                }
            });
    };
    const discountPercentenge = couponCodeData ? discountPrice : "";

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data));
    };

    const quantityChangeHandler = (data) => {
        dispatch(addTocart(data));
    };
    const totalPrice = couponCodeData
        ? (subTotalPrice + shipping - discountPercentenge).toLocaleString("vi-VN")
        : (subTotalPrice + shipping).toLocaleString("vi-VN");

    return (
      <div className="w-full min-h-screen bg-[#f6f9fc]">
        <Header />
        <br />
        <br />
        <CheckoutSteps active={0} />
        <div className="w-full flex flex-col items-center py-8">
          <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
            <div className="w-full 800px:w-[65%] mr-3">
              {cart.map((item, index) => (
                <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={item.images[0].url}
                    alt="product-image"
                    className="w-36 h-full rounded-lg object-cover"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        Nhà cung cấp: {item.shop.name}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          onClick={() => {
                            const updateCartData = {
                              ...item,
                              qty: item.qty - 1,
                            };
                            if (item.qty > 1)
                              quantityChangeHandler(updateCartData);
                          }}
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          value={item.qty}
                          min="1"
                        />
                        <span
                          onClick={() => {
                            const updateCartData = {
                              ...item,
                              qty: item.qty + 1,
                            };
                            quantityChangeHandler(updateCartData);
                          }}
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          {(item.discountPrice * item.qty).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          VND
                        </p>
                        <div
                          onClick={() => {
                            removeFromCartHandler(item);
                          }}
                          className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-full w-full"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
              <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
                <div className="flex justify-between">
                  <h3 className="text-[16px] font-[400] text-[#000000a4]">
                    Subtotal:
                  </h3>
                  <h5 className="text-[18px] font-[600]">
                    {subTotalPrice.toLocaleString("vi-VN")} VNĐ
                  </h5>
                </div>
                <br />
                <div className="flex justify-between">
                  <h3 className="text-[16px] font-[400] text-[#000000a4]">
                    Shipping(10%):
                  </h3>
                  <h5 className="text-[18px] font-[600]">
                    {shipping.toLocaleString("vi-VN")} VNĐ
                  </h5>
                </div>
                <br />
                <div className="flex justify-between border-b pb-3">
                  <h3 className="text-[16px] font-[400] text-[#000000a4]">
                    Discount:
                  </h3>
                  <h5 className="text-[18px] font-[600]">
                    {" "}
                    {discountPercentenge
                      ? discountPercentenge.toLocaleString("vi-VN") + " VNĐ"
                      : null}
                  </h5>
                </div>
                <h5 className="text-[18px] font-[600] text-end pt-3">
                  {totalPrice.toString()} VNĐ
                </h5>
                <br />
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2 border-2 p-2 rounded-lg`}
                    placeholder="Coupoun code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    required
                  />
                  <input
                    className={`w-full  border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer p-2`}
                    required
                    value="Áp mã giảm giá"
                    type="submit"
                  />
                </form>
                <div
                  onClick={() => {
                    const orderData = {
                      cart,
                      totalPrice,
                      subTotalPrice,
                      shipping,
                      discountPrice,
                      user,
                    };
                    localStorage.setItem(
                      "latestOrder",
                      JSON.stringify(orderData)
                    );
                    navigate("/checkout");
                  }}
                  className="flex justify-center items-center w-full h-40px border bg-[#f63b60] text-center text-white rounded-[3px] mt-2 cursor-pointer p-2"
                >
                  Gửi yêu cầu đặt hàng
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
}

