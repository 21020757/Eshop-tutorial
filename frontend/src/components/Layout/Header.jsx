import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineQuestionCircle
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import logo from './logo.png'

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [searchType, setSearchType] = useState("product"); 
  const { sellers } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const { searchs } = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [openResults, setOpenResults] = useState(false);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleTypeChange = (type) => {
     setOpenResults(false)
     setSearchType(type);
     setSearchTerm("");
   };

  const handleSearchChange = (e, type) => {
    console.log(sellers)
    const term = e.target.value;
    if (term != "") {
     setOpenResults(true);
    } else {
      setOpenResults(false)
    }
    
    setSearchTerm(term);
    if (type === "product")  {
      var result =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      var result =
        sellers &&
        sellers.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
    }
    
    setSearchData(result);
    console.log(result)
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                // src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                src={logo}
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative border-[#000] border-[2px] rounded-full p-1 bg-white flex">
            <select
              className="h-[40px] w-[20%] rounded-l-full"
              value={searchType}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="product">Sản phẩm</option>
              <option value="supplier">Nhà cung cấp</option>
            </select>
            <input
              type="text"
              placeholder={
                searchType === "product"
                  ? "Tìm kiếm sản phẩm..."
                  : "Tìm kiếm nhà cung cấp..."
              }
              value={searchTerm}
              onChange={(e) => {
                handleSearchChange(e, searchType);
              }}
              className="h-[40px] w-[80%] px-2 rounded-r-full border-l-[2px] border-[#c8c4c4] pl-4"
            />
            <AiOutlineSearch
              size={30}
              className="right-2 cursor-pointer h-[40px] mr-2"
            />
            {openResults &&
            searchType === "product" &&
            searchData &&
            searchData.length !== 0 ? (
              <div className="absolute bg-slate-50 shadow-sm-2 z-[9] p-2 top-[60px] w-full rounded-xl shadow-xl">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex p-3 items-center hover:bg-gray-300 rounded-lg cursor-pointer">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="h-9 w-9 rounded-sm flex mr-[6px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
            {openResults &&
            searchType === "supplier" &&
            searchData &&
            searchData.length !== 0 ? (
              <div className="absolute bg-slate-50 shadow-sm-2 z-[9] p-2 top-[60px] w-full rounded-xl shadow-xl">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/shop/preview/${i?._id}`}>
                        <div className="w-full flex p-3 items-center hover:bg-gray-300 rounded-lg cursor-pointer">
                          <img
                            src={`${i?.avatar?.url}`}
                            alt=""
                            className="h-9 w-9 rounded-sm flex mr-[6px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Supplier"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-black h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
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

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
