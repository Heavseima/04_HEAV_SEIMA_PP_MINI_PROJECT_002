import ShopUiComponent from "@/components/shop/ShopUiComponent";
import { getAllProducts, getAllCategories } from "@/service/productService";

export default async function Page() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <div className="mx-auto max-w-7xl py-12">
       <ShopUiComponent
          initialProducts={products || []}
          categories={categories || []}
       />
    </div>
  );
}