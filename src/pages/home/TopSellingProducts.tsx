"use client";

import MedicineCard from "@/components/shared/MedicineCard";
import { product } from "@/components/shared/productType";
import SectionTitle from "@/components/shared/SectionTitle";
import { useGetAllProductsQuery } from "@/redux/rtk/fetchData";
import Link from "next/link";

const TopSellingProducts = () => {
  const { data } = useGetAllProductsQuery({});

  return (
    <div className="my-20 px-2 lg:px-4 xl:px-0">
      <SectionTitle title="TOP SELLING PRODUCTS" />

      {/* content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-6 mt-4">
        {data?.products?.slice(-8).map((i: product, idx: number) => (
          <MedicineCard key={idx} data={i} />
        ))}
      </div>

      <div className="flex justify-end mt-5">
        <Link href={"/shop"}>
          <button className="btn btn-outline text-end">See More</button>
        </Link>
      </div>
    </div>
  );
};

export default TopSellingProducts;
