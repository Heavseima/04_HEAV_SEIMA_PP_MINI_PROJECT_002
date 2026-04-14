"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { createOrderAction } from "@/action/orderAction";
import { useRouter } from "next/navigation";

export default function CartComponent() {
  const router = useRouter();

  const { cart, updateQuantity, removeFromCart, clearCart } = useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      const cartItems = useCartStore.getState().cart;
      if (cartItems.length === 0) return;

      await createOrderAction(cartItems);

      clearCart();
      router.push("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed. Please check your connection.");
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 font-sans text-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>
        <p className="text-gray-500 mt-2">
          Cart is stored in memory for this visit — refreshing the page clears
          it.
        </p>
      </div>

      {totalItems === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl py-24 flex flex-col items-center justify-center bg-gray-50/30">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-center max-w-xs">
            Open a product, set quantity, then tap &quot;Add to cart&quot;.
          </p>
          <button
            className="bg-[#0F172A] text-white px-10 py-3 rounded-full font-medium hover:bg-black transition-all active:scale-95"
            onClick={() => router.push("/products")}
          >
            Shop products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm font-semibold text-gray-600">
            {totalItems} {totalItems === 1 ? "product" : "products"} in cart
          </p>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="border border-gray-100 rounded-2xl p-5 flex items-center bg-white shadow-sm"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 mr-5 shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name || "Product image"}
                    height={100}
                    width={100}
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 text-xs font-bold uppercase tracking-wider mt-1 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-8">
              Tax and shipping calculated at checkout (demo).
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#0F172A] text-white py-3 rounded-full font-bold text-lg hover:bg-black transition-colors shadow-lg shadow-slate-200"
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
