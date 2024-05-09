import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Badge from "@mui/material/Badge";
import { CgProfile } from "react-icons/cg";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";

const ShopProfileData = ({ isOwner }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sellers } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [currentProducts, setCurrentProducts] = useState(products);

const [selectedTab, setSelectedTab] = useState("profile");

const addToCartHandler = (id, data) => {
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
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filterProducts = products.filter(item => item.category == category)
    setCurrentProducts(filterProducts)
  };
  
const handleTabClick = (tab) => {
  setSelectedTab(tab);
  setCurrentProducts(products)
};

  return (
    <div className="w-full">
      <div
        className={`shadow-sm top-0 left-0 z-10 transition hidden 800px:flex items-center justify-between w-full bg-black h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={0} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <Badge
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {
                  navigate("/faq");
                }}
                color="error"
              >
                <AiOutlineQuestionCircle
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
              </Badge>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <Badge
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
                badgeContent={wishlist.length}
                color="error"
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
              </Badge>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <Badge
                className="relative cursor-pointer mr-[25px]"
                onClick={() => setOpenCart(true)}
                badgeContent={cart.length}
                color="error"
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
              </Badge>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[25px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <div
                    className={`text-white rounded-md px-3 py-1 text-sm font-medium no-underline cursor-pointer ${
                      selectedTab === "profile"
                        ? "bg-gray-900"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => handleTabClick("profile")}
                  >
                    Hồ sơ nhà cung cấp
                  </div>
                  <div
                    className={`text-gray-300 rounded-md px-3 py-2 text-sm font-medium no-underline cursor-pointer ${
                      selectedTab === "products"
                        ? "bg-gray-900"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => handleTabClick("products")}
                  >
                    Tất cả sản phẩm
                  </div>
                </div>
              </div>
              <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end flex-end">
                <div class="max-w-lg lg:max-w-xs w-60">
                  <label for="search" class="sr-only">
                    Search{" "}
                  </label>
                  <form methode="get" action="#" class="relative">
                    <button
                      type="submit"
                      id="searchsubmit"
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <input
                      type="text"
                      name="s"
                      id="s"
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 placeholder-gray-400 focus:outline-none bg-white sm:text-sm transition duration-150 ease-in-out"
                      placeholder="Tìm kiếm sản phẩm"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {selectedTab === "profile" ? (
        <section className="container mx-auto"></section>
      ) : (
        <section className="container mx-auto">
          <div class="container px-6 py-8 mx-auto">
            <div class="lg:flex lg:-mx-2">
              <div class="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
                <div
                  className={`block font-medium ${
                    selectedCategory === "Computers and Laptops"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Computers and Laptops")}
                >
                  Computers and Laptops
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "cosmetics and body care"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("cosmetics and body care")}
                >
                  cosmetics and body care
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Accesories"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Accesories")}
                >
                  Accesories
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Cloths"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Cloths")}
                >
                  Cloths
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Shoes"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Shoes")}
                >
                  Shoes
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Gifts"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Gifts")}
                >
                  Gifts
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Pet Care"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Pet Care")}
                >
                  Pet Care
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Mobile and Tablets"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Mobile and Tablets")}
                >
                  Mobile and Tablets
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Music and Gaming"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Music and Gaming")}
                >
                  Music and Gaming
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory === "Others"
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                  onClick={() => handleCategoryClick("Others")}
                >
                  Others
                </div>
              </div>

              <div class="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                <div class="flex items-center justify-between text-sm tracking-widest uppercase ">
                  <p class="text-gray-500 dark:text-gray-300">{currentProducts.length} Sản phẩm</p>
                  <div class="flex items-center">
                    <p class="text-gray-500 dark:text-gray-300">Sort</p>
                    <select class="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                      <option value="#">Recommended</option>
                      <option value="#">Size</option>
                      <option value="#">Price</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentProducts &&
                    currentProducts.map((i, index) => (
                      <div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto rounded-xl bg-white p-3 shadow-lg hover:scale-105 duration-300 cursor-pointer">
                        <img
                          class="object-cover w-full rounded-md h-36 xl:h-48"
                          src={i.images[0].url}
                          alt="T-Shirt"
                        />
                        <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                          {i.name}
                        </h4>
                        <p class="text-gray-500 font-semibold">
                          {i.discountPrice.toLocaleString("vi-VN")} VNĐ
                        </p>

                        <button
                          onClick={() => {
                            addToCartHandler(i._id, i);
                          }}
                          class="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 mx-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          <span class="mx-1">Add to cart</span>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <br />
    </div>
  );
};

export default ShopProfileData;
