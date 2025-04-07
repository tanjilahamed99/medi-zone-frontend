import AdminLavList from "@/pages/dashboard/AdminLavList";
import { ReactNode } from "react";

interface layout {
  children: ReactNode;
}

export default function VendorLayout({ children }: layout) {
  return (
    <div className="container mx-auto bg-[#f5f5f5] flex flex-col lg:flex-row">
      <div className="w-fit">
        <AdminLavList />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
