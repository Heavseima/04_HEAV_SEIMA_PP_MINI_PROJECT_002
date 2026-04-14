"use client";

import { Button } from "@heroui/react";
import { useCartStore } from "@/store/cartStore";

export default function ButtonAddComponent({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    if (product) {

      const productToAdd = {
        ...product,
        name: product.productName,
        price: Number(product.price)
      };

      const defaultColor = product.colors?.[0] || "Default";
      const defaultSize = product.sizes?.[0] || "Standard";
      const defaultQuantity = 1;

      addToCart(productToAdd, defaultColor, defaultSize, defaultQuantity);
    }
  };

  return (
    <Button
      isIconOnly
      aria-label="Add to cart"
      onClick={handleAdd}
      className="size-11 rounded-full bg-lime-400 text-xl font-light text-gray-900 shadow-sm transition hover:bg-lime-300 active:scale-95"
    >
      +
    </Button>
  );
}