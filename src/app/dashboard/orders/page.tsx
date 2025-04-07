"use client";

import {
  useGetAllOdersQuery,
  useGetAllProductsQuery,
} from "@/redux/rtk/fetchData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Orders = () => {
  const router = useRouter();
  const { data: user } = useSession();

  const { data: ordersData, isLoading } = useGetAllOdersQuery({
    adminId: user?.user?._id,
    adminEmail: user?.user?.email,
    role: user?.user?.role,
  });

  if (isLoading) {
    return (
      <div className="flex items-center">
        <span className="loading loading-ring  h-[300px] w-[10%] mx-auto"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="bg-white w-full rounded-lg p-3 mb-4">
        <h2 className="text-primary-text font-semibold text-xl px-5">
          All Order
        </h2>
      </div>

      {/* data fetching */}
      <div className="bg-white p-3 rounded-lg">
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full border border-gray-200 bg-white shadow-lg overflow-x-auto">
            {/* Table Header */}
            <thead>
              <tr className=" text-center border-b-2 text-base text-[#040404]">
                <th className=" py-2 border font-normal whitespace-nowrap">
                  No.
                </th>
                <th className=" py-2 border font-normal whitespace-nowrap">
                  User Name
                </th>
                <th className=" py-2 border font-normal whitespace-nowrap">
                  Email
                </th>
                <th className=" py-2 border font-normal whitespace-nowrap">
                  Total Products
                </th>
                <th className=" py-2 border font-normal whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Table rows */}
              {ordersData?.data?.map((i: any, idx: any) => (
                <tr
                  key={idx}
                  className="h-[40px] md:h-[50px] border-b-2 font-normal"
                >
                  <th className="px-4 py-3 border text-center font-normal whitespace-nowrap">
                    {idx + 1}
                  </th>
                  <th className="px-4 py-3 border text-center font-normal whitespace-nowrap">
                    {i?.userName}
                  </th>
                  <th className="px-4 py-3 border text-center font-normal whitespace-nowrap">
                    {i?.userEmail}
                  </th>
                  <th className="px-4 py-3 border text-center font-normal whitespace-nowrap ">
                    {i?.myCartsData?.length}
                  </th>
                  <th className="px-4 py-3 border text-center font-normal whitespace-nowrap cursor-pointer">
                    Pendin
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
