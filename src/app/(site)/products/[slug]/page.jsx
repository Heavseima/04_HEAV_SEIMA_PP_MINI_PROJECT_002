import ProductDetail from "@/components/shop/ProductDetailComponent";
import { getProductById, getAllProducts } from "@/service/productService";
import { auth } from "@/auth";

const page = async ({params}) => {
  const { slug } = await params;
  const session = await auth();

  let initialProduct;
  let allProducts;

  if (session) {
    [initialProduct, allProducts] = await Promise.all([getProductById(slug), getAllProducts()]);
  }

  if (!initialProduct) {
    notFound();
  }

  return <>
    <ProductDetail
      initialProduct={initialProduct}
      allProducts={allProducts}
    />
  </>
};

export default page;
