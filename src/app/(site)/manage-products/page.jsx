import ManageProductsComponent from "./_component/ManageProductComponent";
import { getAllProducts } from "@/service/productService";

const page = async () => {
  const products = await getAllProducts();
  return <>
    <ManageProductsComponent initialProducts={products} />
  </>
};

export default page;
