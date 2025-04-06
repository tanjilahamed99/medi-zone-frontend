"use client";

import RelatedProducts from "@/components/shared/RelatedProducts";
import SectionTitle from "@/components/shared/SectionTitle";
import { useGetSingleProductsQuery } from "@/redux/rtk/fetchData";
import { addItems } from "@/redux/slice/myCart/myCart";
import { BASE_URL } from "@/utils/url";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";


const ProductDetailsForm = ({ id }) => {
  const { data, error } = useGetSingleProductsQuery(id);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { myCart } = useSelector((state) => state?.myCart);
  const { data: user } = useSession();

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "Login First",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }

    const exist = myCart?.myCartsData?.find(
      (item) => item?.name === data?.product?.name
    );
    // Calculate total price without discount
    const totalPriceWithoutDiscount = data?.product?.price * quantity;
    const discountPercentage = data?.product?.discount;
    const discountAmountPerProduct =
      (data?.product?.price * discountPercentage) / 100;
    const totalDiscount = discountAmountPerProduct * quantity;
    const finalPrice = totalPriceWithoutDiscount - totalDiscount;

    const myData = {
      myCartsData: [
        {
          images: data?.product?.images,
          name: data?.product?.name,
          type: data?.product?.type,
          company: data?.product?.company,
          description: data?.product?.description,
          quantity,
          finalPrice,
          productsId: data?.product?._id,
        },
      ],
      userEmail: user?.user?.email,
      userName: user?.user?.name,
    };

    if (myCart?.myCartsData?.length > 0) {
      if (exist) {
        const totalPrice = finalPrice + exist?.finalPrice;
        const maxQuantity = exist?.quantity + quantity;

        const filterData = myCart?.myCartsData.filter(
          (item: any) => item.name !== data?.product?.name
        );

        const updatedData = {
          myCartsData: [
            {
              images: data?.product?.images,
              name: data?.product?.name,
              type: data?.product?.type,
              company: data?.product?.company,
              description: data?.product?.description,
              quantity: maxQuantity,
              finalPrice: totalPrice,
              productsId: data?.product?._id,
            },
            ...filterData,
          ],
          userEmail: user?.user?.email,
          userName: user?.user?.name,
        };
        const { data: res } = await axios.post(
          `${BASE_URL}/carts`,
          updatedData
        );
        if (res?.status) {
          dispatch(addItems(updatedData));
          Swal.fire({
            title: "Good job!",
            text: `You parches ${quantity}  ${data?.product?.name} at ${finalPrice}`,
            icon: "success",
          });
        }
      } else {
        const myData = {
          myCartsData: [
            {
              images: data?.product?.images,
              name: data?.product?.name,
              type: data?.product?.type,
              company: data?.product?.company,
              description: data?.product?.description,
              quantity,
              finalPrice,
              productsId: data?.product?._id,
            },
            ...myCart?.myCartsData,
          ],
          userEmail: user?.user?.email,
          userName: user?.user?.name,
        };
        const { data: res } = await axios.post(`${BASE_URL}/carts`, myData);
        if (res?.status) {
          dispatch(addItems(myData));
          Swal.fire({
            title: "Good job!",
            text: `You parches ${quantity}  ${data?.product?.name} at ${finalPrice}`,
            icon: "success",
          });
        }
      }
    } else {
      const { data: res } = await axios.post(`${BASE_URL}/carts`, myData);
      if (res?.status) {
        dispatch(addItems(myData));
        Swal.fire({
          title: "Good job!",
          text: `You parches ${quantity}  ${data?.product?.name} at ${finalPrice}`,
          icon: "success",
        });
      }
    }
  };

  if (!data) {
    return (
      <div className="flex items-center">
        <span className="loading loading-ring  h-[300px] w-[10%] mx-auto"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row items-start my-10 gap-5">
        {/* Left side */}
        <div className="border shadow lg:w-[500px] relative mx-auto">
          <div className="">
            <Image
              src={data?.product?.images[0]}
              alt="image"
              className=" col-span-2 h-[200px] md:h-[250px] lg:border-b p-5 lg:border-primary-text"
              height={500}
              width={500}
            />
            <div className="lg:flex items-center md:p-4 justify-center gap-20 hidden">
              <Image
                src={data?.product?.images[1]}
                alt="image"
                className=" h-[130px] w-[140px]"
                height={500}
                width={500}
              />
              <Image
                src={data?.product?.images[2]}
                alt="image"
                className=" h-[130px] w-[140px] "
                height={500}
                width={500}
              />
            </div>
          </div>
          <div className="absolute top-2 left-3 flex gap-1">
            {data?.product?.popular && (
              <h3 className="bg-yellow-600 rounded-full text-[10px] text-white w-fit px-2 py-0.5">
                POPULAR
              </h3>
            )}

            {data?.product?.discount && (
              <h3 className="bg-blue-500 rounded-full text-[10px] text-white w-fit px-2 py-0.5">
                SALE
              </h3>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="lg:w-1/2 space-y-5 mt-4 pl-2 md:pl-5 lg:pl-0">
          <div className="space-y-1">
            <h2 className="text-primary-text font-medium">
              {data?.product?.name}
            </h2>
            <p className="flex items-center font-extrabold text-primary-text">
              <MdOutlineAttachMoney className="text-xl" />
              {data?.product?.price}
            </p>
            {/* Ratings */}
            <div className="flex items-center gap-3">
              <Rating
                initialRating={data?.product?.ratings || 2}
                emptySymbol={
                  <IoStarOutline className="text-xl h-[24px] w-[25px] text-[#F9BF2D]" />
                }
                fullSymbol={
                  <IoStar className="text-xl h-[24px] w-[25px] text-[#F9BF2D]" />
                }
              />
              <h3 className="text-primary-text font-semibold">
                ({data?.product?.review?.length} customer reviews)
              </h3>
            </div>
            {/* <p>{data.description}</p> */}
            <p>{data?.product?.description.slice(0, 400)}</p>
          </div>

          <div className="flex  items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="relative  overflow-hidden border border-primary-text bg-white px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md"
              >
                <span className="relative z-10">-</span>
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
                className="w-12 text-center border border-gray-300 rounded no-spinner"
                min="1"
                max={data?.products?.quantity}
              />
              <button
                onClick={handleIncrease}
                className="relative  overflow-hidden border border-primary-text bg-white px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md"
              >
                <span className="relative z-10">+</span>
              </button>
            </div>

            {/* add to cart button */}
            <button
              onClick={handleSubmit}
              className="relative h-10 w-40 overflow-hidden border border-primary-text bg-white px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md"
            >
              <span className="relative z-10">Add to cart</span>
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-primary-text font-medium">
              Category : {data?.product?.type}
            </h2>
            <h2 className="text-primary-text font-medium">
              Company : {data?.product?.company}
            </h2>
            <h2></h2>
          </div>
        </div>
      </div>

      <div className="pl-2 md:pl-5 lg:pl-2 xl:px">
        <h2 className="text-primary-text font-semibold text-2xl ">
          Description
        </h2>

        <p className="mt-2 text-primary-text">{data?.product?.description}</p>

        <div className="grid md:grid-cols-2 items-center lg:w-2/3 xl:w-1/2 gap-2 mt-5 text-primary-text">
          <li>Fast-Acting Relief</li>
          <li>Long-Lasting Effect</li>
          <li>Doctor-Recommended Formula</li>
          <li>Non-Drowsy Formula</li>
          <li>Easy-to-Swallow</li>
          <li>Rapid Absorption</li>
          <li>Allergy-Friendly</li>
          <li>Gentle on Stomach</li>
          <li>Prescription-Strength</li>
        </div>
      </div>

      <div className="mt-16 px-2 xl:px-0">
        <RelatedProducts category={data?.product?.category} />
      </div>
    </div>
  );
};

export default ProductDetailsForm;
