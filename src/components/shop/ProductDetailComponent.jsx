"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { setRatingAction } from "@/action/productAction";

export default function ProductDetail({ initialProduct, allProducts }) {
  const [product, setProduct] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(product.star || 0);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleRating = async (index) => {
    const newRating = index + 1;
    setRating(newRating);
    try {
      await setRatingAction(product.productId, newRating);
    } catch (error) {
      console.error("Failed to update rating", error);
    }
  };

  const updateActiveProduct = (newProduct) => {
    setProduct(newProduct);
    setSelectedColor(newProduct.colors?.[0] || "");
    setSelectedSize(newProduct.sizes?.[0] || "");
    setRating(newProduct.star || 0);
    setQuantity(1);
  };

  const switchProduct = (direction) => {
    const currentIndex = allProducts.findIndex(p => p.productId === product.productId);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= allProducts.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = allProducts.length - 1;
    updateActiveProduct(allProducts[nextIndex]);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 font-sans text-slate-900">
      <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">

        <div className="w-full lg:w-145 shrink-0">
          <div className="bg-[#f8f9fa] rounded-3xl overflow-hidden aspect-4/5 relative border border-gray-200">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-12"
              priority
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <button key={i} onClick={() => handleRating(i)} className="focus:outline-none transition-transform active:scale-125">
                  <svg className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200 fill-gray-200"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-[32px] font-bold text-[#003399]">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 line-through text-lg">${(product.price * 1.15).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-900">Choose a color</p>
            <div className="flex flex-wrap gap-3">
              {product.colors?.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition-all text-sm font-semibold
                      ${isSelected ? 'border-gray-900 shadow-sm' : 'border-gray-200 bg-white'}`}
                    style={{
                      backgroundColor: isSelected ? color.toLowerCase() : 'white',
                      borderColor: isSelected ? color.toLowerCase() : 'lightgray',
                      color: isSelected ? (['white', 'yellow'].includes(color.toLowerCase()) ? 'black' : 'white') : 'black'
                    }}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 font-medium">Selected: {selectedColor}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-900">Choose a size</p>
            <div className="flex gap-3">
              {product.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition-all text-sm font-bold
                    ${selectedSize === size ? 'border-[#3366ff] bg-white text-[#3366ff] ring-1 ring-[#3366ff]' : 'border-gray-100 text-gray-400'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${selectedSize === size ? 'bg-[#3366ff]' : 'bg-gray-300'}`}></span>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed max-w-lg">{product.description}</p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 h-11 px-2">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 text-lg text-gray-400 hover:text-black">−</button>
              <span className="w-8 text-center font-bold text-sm">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="w-8 text-lg text-gray-400 hover:text-black">+</button>
            </div>
            <button
              onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
              className="flex-1 bg-[#1a233a] text-white rounded-lg h-11 font-bold text-sm hover:bg-[#0f172a] transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
              Add to cart
            </button>
          </div>

          <div className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-100 mt-6">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <p className="font-bold text-slate-900 text-base">Free 30-day returns</p>
            </div>
            <p className="text-slate-500 text-sm mt-1 ml-8">See return policy details in cart.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 flex items-center gap-8">
        <button onClick={() => switchProduct('prev')} className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-90 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="flex gap-4">
          {allProducts.slice(0, 3).map((p) => (
            <button
              key={p.productId}
              onClick={() => updateActiveProduct(p)}
              className={`relative w-24 h-24 rounded-2xl border-2 transition-all bg-white p-2
                ${p.productId === product.productId ? 'border-blue-600 scale-105' : 'border-gray-100'}`}
            >
              <div className="relative w-full h-full">
                <Image src={p.imageUrl} alt={p.name} fill className="object-contain" />
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => switchProduct('next')} className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-all active:scale-90 shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}