import AdminLavList from "@/pages/dashboard/AdminLavList";

export default function VendorLayout({ children }) {
  return (
    <div className="container mx-auto bg-[#f5f5f5] flex flex-col lg:flex-row">
      <div className="w-fit">
        <AdminLavList />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
