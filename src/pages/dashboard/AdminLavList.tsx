"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const AdminLavList = () => {
  const { data: user, status }  = useSession();
  const path = usePathname();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-row flex-wrap lg:flex-col pl-6 py-2 gap-5 lg:gap-0">
      <Link href={"/dashboard/allProducts"}>
        <button
          className={`relative md:h-10 md:w-40 overflow-hidden border-2 px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md mt-3 *:`}
        >
          <span className="relative z-10">Products</span>
        </button>
      </Link>

      {user?.user?.role === "superAdmin" && (
        <Link href={"/dashboard/users"}>
          <button
            className={`relative md:h-10 md:w-40 overflow-hidden border-2 px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md mt-3 *:`}
          >
            <span className="relative z-10">Users</span>
          </button>
        </Link>
      )}

      <Link href={"/dashboard/orders"}>
        <button
          className={`relative md:h-10 md:w-40 overflow-hidden border-2 px-3 text-primary-text shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-primary-text before:transition-all before:duration-500 hover:text-white hover:shadow-primary-text hover:before:left-0 hover:before:w-full rounded-md mt-3 *:`}
        >
          <span className="relative z-10">Orders</span>
        </button>
      </Link>
    </div>
  );
};

export default AdminLavList;
