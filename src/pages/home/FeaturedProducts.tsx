"use client";

import MedicineCard from "@/components/shared/MedicineCard";
import SectionTitle from "@/components/shared/SectionTitle";
import { useGetAllProductsQuery } from "@/redux/rtk/fetchData";

const FeaturedProducts = () => {
  const { data, refetch } = useGetAllProductsQuery({});

  return (
    <div className="my-20 px-2 lg:px-4 xl:px-0">
      <SectionTitle title="Featured Products" />

      {/* content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-6 mt-4">
        {data?.products?.slice(0, 8).map((i, idx) => (
          <MedicineCard key={idx} data={i} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
