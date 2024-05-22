import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
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
  AiOutlineCloseCircle
  
} from "react-icons/ai";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";


const ShopProfileData = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sellers } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  useEffect(() => {
    const filterProducts =
      selectedCategory.length !== 0
        ? products.filter((item) => selectedCategory.includes(item.category))
        : products;
    setCurrentProducts(filterProducts);
  }, [selectedCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  

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
    const newFilter = [...selectedCategory, category]
    setSelectedCategory(newFilter);
    
  };

  const removeAllCategory = () => {
    setSelectedCategory([])
  }

  const cancelCategory = (category) => {
    const newFilter = [...selectedCategory];
    newFilter.splice(newFilter.findIndex(value => value === category), 1)
    setSelectedCategory(newFilter);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setCurrentProducts(products);
    console.log(products)
  };

  const searchProduct = (keyword) => {
    const result = products.filter((item) => item.name.toLowerCase().includes(keyword.toLowerCase()));
    console.log(result)
    if (keyword.length === 0) { setSearchResult([]) } else setSearchResult(result);
  }

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
      <nav className="bg-gray-800 top-0 left-0 sticky">
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
              <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end relative">
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
                      onChange={(e) => searchProduct(e.target.value)}
                    />
                  </form>
                  {searchResult.length !== 0 && (
                    <div className=" bg-white absolute mt-1 w-60 rounded-md py-2">
                      {searchResult.map((item) => (
                        <Link
                          to={`/product/${item._id}`}
                          className=" p-2 cursor-pointer hover:bg-gray-300 rounded-sm overflow-hidden text-ellipsis whitespace-nowrap w-60 block"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {selectedTab === "profile" ? (
        <section className="container mx-auto">
          <div class="bg-white shadow-xl pb-8">
            <div class="w-full h-[250px]">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="w-full h-full"
              />
            </div>
            <div class="flex flex-col items-center -mt-20">
              <img
                src={`${data.avatar?.url}`}
                className="w-40 h-40 border-4 border-white rounded-full"
              ></img>
              <div class="flex items-center space-x-2 mt-2">
                <p class="text-2xl">{data.name}</p>
                <span class="bg-blue-500 rounded-full p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-gray-100 h-2.5 w-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p class="text-gray-700">{data.address}</p>
              <p class="text-sm text-gray-500">
                Tham gia vào {data?.createdAt?.slice(0, 10)}
              </p>
            </div>
            <div class="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Message</span>
              </button>
            </div>
          </div>
          <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
            <div class="w-full flex flex-col 2xl:w-1/3">
              <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 class="text-xl text-gray-900 font-bold">
                  Thông tin nhà cung cấp
                </h4>
                <ul class="mt-2 text-gray-700">
                  <li class="flex border-y py-2">
                    <span class="font-bold w-24">Tên:</span>
                    <span class="text-gray-700">{data.name}</span>
                  </li>
                  <li class="flex border-b py-2">
                    <span class="font-bold w-24">Nhân viên:</span>
                    <span class="text-gray-700">300</span>
                  </li>
                  <li class="flex border-b py-2">
                    <span class="font-bold w-24">Tham gia:</span>
                    <span class="text-gray-700">
                      {data?.createdAt?.slice(0, 10)}
                    </span>
                  </li>
                  <li class="flex border-b py-2">
                    <span class="font-bold w-24">Điện thoại:</span>
                    <span class="text-gray-700">{data.phoneNumber}</span>
                  </li>
                  <li class="flex border-b py-2">
                    <span class="font-bold w-24">Email:</span>
                    <span class="text-gray-700">{data.email}</span>
                  </li>
                  <li class="flex border-b py-2">
                    <span class="font-bold w-24">Location:</span>
                    <span class="text-gray-700">{data.address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="container mx-auto">
          <div className="container px-6 py-8 mx-auto">
            <div className="lg:flex lg:-mx-2">
              <div className="space-y-3 lg:w-1/5 lg:px-4 lg:space-y-4 border-2 py-4 mr-4 rounded-lg bg-white shadow-xl">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-500">Lọc sản phẩm</span>
                  {selectedCategory.length!==0&&<AiOutlineCloseCircle className="text-xl cursor-pointer" onClick={removeAllCategory} />}
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Computers and Laptops")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer flex items-center`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Computers and Laptops")}
                    onChange={() =>
                      !selectedCategory.includes("Computers and Laptops")
                        ? handleCategoryClick("Computers and Laptops")
                        : cancelCategory("Computers and Laptops")
                    }
                  />
                  Computers and Laptops
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("cosmetics and body care")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes(
                      "cosmetics and body care"
                    )}
                    onChange={() =>
                      !selectedCategory.includes("cosmetics and body care")
                        ? handleCategoryClick("cosmetics and body care")
                        : cancelCategory("cosmetics and body care")
                    }
                  />
                  cosmetics and body care
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Accesories")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Accesories")}
                    onChange={() =>
                      !selectedCategory.includes("Accesories")
                        ? handleCategoryClick("Accesories")
                        : cancelCategory("Accesories")
                    }
                  />
                  Accesories
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Cloths")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Cloths")}
                    onChange={() =>
                      !selectedCategory.includes("Cloths")
                        ? handleCategoryClick("Cloths")
                        : cancelCategory("Cloths")
                    }
                  />
                  Cloths
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Shoes")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Shoes")}
                    onChange={() =>
                      !selectedCategory.includes("Shoes")
                        ? handleCategoryClick("Shoes")
                        : cancelCategory("Shoes")
                    }
                  />
                  Shoes
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Gifts")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Gifts")}
                    onChange={() =>
                      !selectedCategory.includes("Gifts")
                        ? handleCategoryClick("Gifts")
                        : cancelCategory("Gifts")
                    }
                  />
                  Gifts
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Pet Care")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Pet Care")}
                    onChange={() =>
                      !selectedCategory.includes("Pet Care")
                        ? handleCategoryClick("Pet Care")
                        : cancelCategory("Pet Care")
                    }
                  />
                  Pet Care
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Mobile and Tablets")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Mobile and Tablets")}
                    onChange={() =>
                      !selectedCategory.includes("Mobile and Tablets")
                        ? handleCategoryClick("Mobile and Tablets")
                        : cancelCategory("Mobile and Tablets")
                    }
                  />
                  Mobile and Tablets
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Music and Gaming")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Music and Gaming")}
                    onChange={() =>
                      !selectedCategory.includes("Music and Gaming")
                        ? handleCategoryClick("Music and Gaming")
                        : cancelCategory("Music and Gaming")
                    }
                  />
                  Music and Gaming
                </div>
                <div
                  className={`block font-medium ${
                    selectedCategory.includes("Others")
                      ? "text-blue-600"
                      : "text-gray-500"
                  } dark:text-gray-300 cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer"
                    checked={selectedCategory.includes("Others")}
                    onChange={() =>
                      !selectedCategory.includes("Others")
                        ? handleCategoryClick("Others")
                        : cancelCategory("Others")
                    }
                  />
                  Others
                </div>
              </div>

              <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
                <div className="flex items-center justify-between text-sm tracking-widest uppercase">
                  <p className="text-gray-500 dark:text-gray-300">
                    {currentProducts.length} Sản phẩm
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {currentProducts &&
                    currentProducts.map((i, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center w-full max-w-lg mx-auto rounded-xl bg-white p-3 shadow-lg hover:scale-105 duration-300 cursor-pointer"
                      >
                        <img
                          className="object-cover w-full rounded-md h-36 xl:h-48"
                          src={i.images[0].url}
                          alt="T-Shirt"
                        />
                        <h4 className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                          {i.name}
                        </h4>
                        <p className="text-gray-500 font-semibold">
                          {i.discountPrice.toLocaleString("vi-VN")} VNĐ
                        </p>

                        <button
                          onClick={() => {
                            addToCartHandler(i._id, i);
                          }}
                          className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mx-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                          </svg>
                          <span className="mx-1">Add to cart</span>
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
