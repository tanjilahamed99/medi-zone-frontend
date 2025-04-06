"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { product } from "./productType";

type ProductsProps = {
  data: product;
};

const MedicineCard: React.FC<ProductsProps> = ({ data }) => {
  console.log(data);

  return (
    <div>
      <div className=" p-4 shadow rounded-md relative border">
        {/* image */}

        {data?.images && (
          <Image
            className="w-[200px] h-[150px] mx-auto"
            src={data?.images[0] || ""}
            alt="card img"
            height={500}
            width={500}
          />
        )}

        <div className="space-y-3 mt-4">
          <div className="space-y-1">
            <h2 className="text-primary-text font-medium">{data?.name}</h2>
            <p className="flex items-center font-extrabold text-primary-text">
              <MdOutlineAttachMoney className="text-xl" />
              {data?.price}
            </p>
          </div>

          <Link href={`/productsDetails?id=${data?._id}`}>
            <button className="relative h-10 w-40 overflow-hidden border border-primary-text bg-white px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md mt-3">
              <span className="relative z-10">View Details</span>
            </button>
          </Link>
        </div>
        <div className="absolute top-2 left-3 flex gap-1">
          {data.popular ? (
            <h3 className="bg-yellow-600 rounded-full text-[10px] text-white w-fit px-2 py-0.5">
              POPULAR
            </h3>
          ) : null}

          {data.discount ? (
            <h3 className="bg-blue-500 rounded-full text-[10px] text-white w-fit px-2 py-0.5">
              SALE
            </h3>
          ) : null}
        </div>
        <h3></h3>
      </div>
    </div>
  );
};

export default MedicineCard;
