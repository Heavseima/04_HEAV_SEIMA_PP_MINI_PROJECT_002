"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  createProductAction,
  deleteProductAction,
} from "@/action/productAction";

export default function ManageProductsComponent({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    return list.sort((a, b) => {
      return sortOrder === "A-Z"
        ? a.productName.localeCompare(b.productName)
        : b.productName.localeCompare(a.productName);
    });
  }, [products, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 font-sans text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Manage Products
          </h1>
          <p className="text-slate-500 mt-1">
            Create, update, and delete products in this demo.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              Sort
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-100 border-none rounded-full px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-lime-500 cursor-pointer"
            >
              <option value="A-Z">Name (A-Z)</option>
              <option value="Z-A">Name (Z-A)</option>
            </select>
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-[#86efac] hover:bg-[#4ade80] text-slate-900 font-bold px-6 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-sm"
          >
            <span className="text-xl">+</span> Create product
          </button>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-8">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">
          Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductManageCard key={product.productId} product={product} />
          ))}
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateProductModal onClose={() => setCreateModalOpen(false)} />
      )}
    </div>
  );
}

function ProductManageCard({ product }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm hover:shadow-md transition-shadow relative group">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <span className="font-black text-slate-400 text-xl">...</span>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-100 rounded-2xl shadow-xl z-20 overflow-hidden">
            <button className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-slate-50 text-slate-700">
              Edit
            </button>
            <button className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-red-50 text-red-600 border-t border-slate-50">
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="aspect-square bg-slate-50 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.productName}
          width={200}
          height={200}
          className="object-contain p-8 group-hover:scale-110 transition-transform"
        />
      </div>

      <div className="space-y-1">
        <div className="flex text-amber-400 text-xs">
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < product.star ? "★" : "☆"}</span>
          ))}
          <span className="text-slate-400 ml-1 font-bold">{product.star}</span>
        </div>
        <h3 className="font-extrabold text-slate-800 line-clamp-1">
          {product.productName}
        </h3>
        <p className="font-black text-lg text-slate-900">${product.price}</p>
      </div>

      <button className="absolute bottom-5 right-5 w-10 h-10 bg-[#86efac] rounded-full flex items-center justify-center font-bold shadow-sm hover:scale-110 transition-transform">
        +
      </button>
    </div>
  );
}

function CreateProductModal({ onClose }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {
      productName: formData.get("name"),
      price: parseFloat(formData.get("price")),
      description: formData.get("desc"),
      imageUrl: formData.get("image"),
      categoryName: formData.get("category"),
    };

    try {
      await createProductAction(data);
      onClose();
      window.location.reload(); // Refresh to see new product
    } catch (err) {
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-lg p-10 shadow-2xl">
        <h2 className="text-2xl font-black mb-6">Create New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold"
            required
          />
          <div className="flex gap-4">
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold"
              required
            />
            <input
              name="category"
              placeholder="Category"
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold"
              required
            />
          </div>
          <input
            name="image"
            placeholder="Image URL"
            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold"
            required
          />
          <textarea
            name="desc"
            placeholder="Description"
            rows="3"
            className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 font-bold"
            required
          />

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 font-bold text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#86efac] py-4 rounded-full font-black text-slate-900 shadow-lg shadow-lime-100 hover:bg-[#4ade80] transition-all disabled:opacity-50"
            >
              {loading ? "Creating..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
