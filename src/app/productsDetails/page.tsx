import ProductDetailsForm from "@/pages/productsDetails/ProductDetailsForm";

type props = {
  searchParams: {
    id?: string;
  };
};

const page = ({ searchParams }: props) => {
  const id = searchParams?.id;

  return (
    <div>
      <ProductDetailsForm id={id} />
    </div>
  );
};

export default page;
