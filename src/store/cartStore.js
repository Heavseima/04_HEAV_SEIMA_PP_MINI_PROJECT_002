import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product, selectedColor, selectedSize, quantity) => {
    const cart = get().cart;

    const cartItemId = `${product.productId}-${selectedColor}-${selectedSize}`;

    const existingItem = cart.find((item) => item.id === cartItemId);

    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      });
    } else {
      set({
        cart: [
          ...cart,
          {
            id: cartItemId,
            productId: product.productId,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            color: selectedColor,
            size: selectedSize,
            quantity,
          },
        ],
      });
    }
  },

  updateQuantity: (productId, amount) => {
    const currentCart = get().cart;
    set({
      cart: currentCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    });
  },

  removeFromCart: (productId) => {
    set({ cart: get().cart.filter((item) => item.productId !== productId) });
  },

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  },

  getTotalItems: () => {
    return get().cart.length;
  },
}));
