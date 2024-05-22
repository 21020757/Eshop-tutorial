import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      setData(allProducts);
    } else {
      setData(
        selectedCategory.length !== 0
          ? allProducts.filter((item) =>
              selectedCategory.includes(item.category)
            )
          : allProducts
      );
    }
  }, [allProducts, categoryData]);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevSelectedCategory) => {
      const newFilter = [...prevSelectedCategory, category];
      setData(allProducts.filter((item) => newFilter.includes(item.category)));
      return newFilter;
    });
  };

  const removeAllCategory = () => {
    setSelectedCategory([]);
    setData(allProducts);
  };

  const cancelCategory = (category) => {
    setSelectedCategory((prevSelectedCategory) => {
      const newFilter = prevSelectedCategory.filter(
        (value) => value !== category
      );
      setData(allProducts.filter((item) => newFilter.includes(item.category)));
      return newFilter;
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className="flex w-11/12 mx-auto mb-8">
            <div className="lg:w-1/5">
              <div className=" rounded-lg bg-white shadow-xl border-2 py-4 mr-4 space-y-3 lg:px-4 lg:space-y-4">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-500">Lọc sản phẩm</span>
                  {selectedCategory.length !== 0 && (
                    <AiOutlineCloseCircle
                      className="text-xl cursor-pointer"
                      onClick={removeAllCategory}
                    />
                  )}
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
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[25px] mb-12 w-4/5">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
