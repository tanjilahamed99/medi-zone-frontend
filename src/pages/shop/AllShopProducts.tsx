"use client";

import MedicineCard from "@/components/shared/MedicineCard";
import { product } from "@/components/shared/productType";
import SectionTitle from "@/components/shared/SectionTitle";
import { useGetAllProductsQuery } from "@/redux/rtk/fetchData";

const AllShopProducts = () => {
  const { data } = useGetAllProductsQuery({});

  if (!data) {
    return (
      <div className="flex items-center">
        <span className="loading loading-ring  h-[300px] w-[10%] mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="my-5 px-2 xl:px-0">
      <SectionTitle title="All Products" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-6 mt-4">
        {data?.products?.map((i: product, idx: number) => (
          <MedicineCard key={idx} data={i} />
        ))}
      </div>
    </div>
  );
};

export default AllShopProducts;
