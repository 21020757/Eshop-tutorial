import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import { Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../server";
import axios from "axios";

const BestSellingPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { sellers, isLoading } = useSelector((state) => state.seller);
  useEffect(() => {
    const allsellersData = sellers ? [...sellers] : [];
    setData(allsellersData);
    console.log(allsellersData);

  }, [sellers]);
  const getNumsProduct = (id) => {
    const data = allProducts;
    return data.filter((i) => i.shopId === id).length
  }
  function formatDate(inputDateStr) {
    // Tạo đối tượng Date từ chuỗi thời gian đầu vào
    const date = new Date(inputDateStr);

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = date.getDate(); // Lấy ngày
    const month = date.getMonth() + 1; // Lấy tháng (phải cộng thêm 1 vì tháng trong JavaScript được đánh số từ 0 đến 11)
    const year = date.getFullYear(); // Lấy năm

    // Tạo chuỗi ngày tháng năm mới theo định dạng "ngày-tháng-năm"
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  }
  const handleMessageSubmit = async (id) => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="">
              {data &&
                data.map((i, index) => (
                  <div class="flex flex-row rounded-lg border border-gray-200/80 bg-white p-6 mb-4">
                    <div className=" relative">
                      <img
                        class="w-40 h-40 rounded-md object-cover"
                        src={i?.avatar?.url}
                        alt="User"
                      />
                    </div>
                    <div className=" flex flex-col px-6 items-start">
                      <div className="flex h-8 flex-row">
                        <h2 className="text-[16px] font-semibold underline whitespace-nowrap overflow-hidden text-ellipsis">
                          {i.name}
                        </h2>
                        <svg
                          class="ml-2 h-5 fill-blue-400 text-[16px] mt-1"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" />
                        </svg>
                      </div>
                      <div class="my-2 flex flex-row space-x-2">
                        <div class="flex flex-row">
                          <svg
                            class="mr-2 h-4 w-4 fill-gray-500/80"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                          </svg>

                          <div class="text-xs text-gray-400/80 hover:text-gray-400">
                            100 nhân viên
                          </div>
                        </div>

                        <div class="flex flex-row">
                          <Phone class=" mr-2 h-4 w-4 fill-gray-500/80" />
                          <div class="text-xs text-gray-400/80 hover:text-gray-400">
                            +{i.phoneNumber}
                          </div>
                        </div>

                        <div class="flex flex-row">
                          <svg
                            class="mr-2 h-4 w-4 fill-gray-500/80"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
                          </svg>

                          <div class="text-xs text-gray-400/80 hover:text-gray-400">
                            {i.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-row items-center space-x-5">
                        <div class="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                          <div class="flex flex-row items-center justify-center">
                            <svg
                              class="mr-3 fill-gray-500/95"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12,23A1,1 0 0,1 11,22V19H7A2,2 0 0,1 5,17V7A2,2 0 0,1 7,5H21A2,2 0 0,1 23,7V17A2,2 0 0,1 21,19H16.9L13.2,22.71C13,22.89 12.76,23 12.5,23H12M13,17V20.08L16.08,17H21V7H7V17H13M3,15H1V3A2,2 0 0,1 3,1H19V3H3V15M9,9H19V11H9V9M9,13H17V15H9V13Z" />
                            </svg>

                            <span class="font-bold text-gray-600"> 4.6K </span>
                          </div>

                          <div class="mt-2 text-sm text-gray-400">Lượt đánh giá</div>
                        </div>
                        <div class="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                          <div class="flex flex-row items-center justify-center">
                            <svg
                              class="mr-3 fill-gray-500/95"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M2.5 19.6L3.8 20.2V11.2L1.4 17C1 18.1 1.5 19.2 2.5 19.6M15.2 4.8L20.2 16.8L12.9 19.8L7.9 7.9V7.8L15.2 4.8M15.3 2.8C15 2.8 14.8 2.8 14.5 2.9L7.1 6C6.4 6.3 5.9 7 5.9 7.8C5.9 8 5.9 8.3 6 8.6L11 20.5C11.3 21.3 12 21.7 12.8 21.7C13.1 21.7 13.3 21.7 13.6 21.6L21 18.5C22 18.1 22.5 16.9 22.1 15.9L17.1 4C16.8 3.2 16 2.8 15.3 2.8M10.5 9.9C9.9 9.9 9.5 9.5 9.5 8.9S9.9 7.9 10.5 7.9C11.1 7.9 11.5 8.4 11.5 8.9S11.1 9.9 10.5 9.9M5.9 19.8C5.9 20.9 6.8 21.8 7.9 21.8H9.3L5.9 13.5V19.8Z" />
                            </svg>

                            <span class="font-bold text-gray-600"> {getNumsProduct(i._id)} </span>
                          </div>

                          <div class="mt-2 text-sm text-gray-400">Sản phẩm</div>
                        </div>
                        <div class="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                          <div class="flex flex-row items-center justify-center">
                            <svg
                              class="mr-3 fill-gray-500/95"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5.68,19.74C7.16,20.95 9,21.75 11,21.95V19.93C9.54,19.75 8.21,19.17 7.1,18.31M13,19.93V21.95C15,21.75 16.84,20.95 18.32,19.74L16.89,18.31C15.79,19.17 14.46,19.75 13,19.93M18.31,16.9L19.74,18.33C20.95,16.85 21.75,15 21.95,13H19.93C19.75,14.46 19.17,15.79 18.31,16.9M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12M4.07,13H2.05C2.25,15 3.05,16.84 4.26,18.32L5.69,16.89C4.83,15.79 4.25,14.46 4.07,13M5.69,7.1L4.26,5.68C3.05,7.16 2.25,9 2.05,11H4.07C4.25,9.54 4.83,8.21 5.69,7.1M19.93,11H21.95C21.75,9 20.95,7.16 19.74,5.68L18.31,7.1C19.17,8.21 19.75,9.54 19.93,11M18.32,4.26C16.84,3.05 15,2.25 13,2.05V4.07C14.46,4.25 15.79,4.83 16.9,5.69M11,4.07V2.05C9,2.25 7.16,3.05 5.68,4.26L7.1,5.69C8.21,4.83 9.54,4.25 11,4.07Z" />
                            </svg>

                            <span class="font-bold text-gray-600">{formatDate(i.createdAt)}</span>
                          </div>

                          <div class="mt-2 text-sm text-gray-400">
                            Tham gia vào
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-100 flex flex-grow flex-col items-end justify-start">
                      <div class="flex flex-row space-x-3">
                        <button
                          onClick={() => {
                            navigate(`/shop/preview/${i._id}`);
                          }}
                          class="flex rounded-full py-2 px-4 text-black transition-all duration-150 ease-in-out hover:bg-gray-300 border-[1px] border-black">
                          Xem gian hàng
                        </button>
                        <button
                          onClick={
                            () => {
                              handleMessageSubmit(i._id);
                            }
                          }
                          class="flex rounded-full py-2 px-4 text-black transition-all duration-150 ease-in-out hover:bg-gray-300 border-[1px] border-black">
                          Chat với chúng tôi
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
