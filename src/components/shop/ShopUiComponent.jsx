"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import ShopCardComponent from "./ShopCardComponent";

export default function ShopUiComponent({
  initialProducts,
  categories,
}) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedCats, setSelectedCats] = useState([]);

  const handleCatChange = (catId) => {
    if (selectedCats.includes(catId)) {
      setSelectedCats(selectedCats.filter((id) => id !== catId));
    } else {
      setSelectedCats([...selectedCats, catId]);
    }
  };

  const filteredProducts = initialProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = p.price <= maxPrice;
    const matchesCat =
      selectedCats.length === 0 || selectedCats.includes(p.categoryId);

    return matchesSearch && matchesPrice && matchesCat;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Luxury beauty products
          </h1>
          <p className="text-gray-500 mt-2">
            Use the filters to narrow by price and brand.
          </p>
        </div>
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3 outline-none focus:border-gray-900 transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={() => {
                  setSearch("");
                  setMaxPrice(300);
                  setSelectedCats([]);
                }}
                className="text-xs font-bold text-gray-400 hover:text-gray-900 py-1 px-3 rounded-full border border-gray-200 hover:bg-gray-50 transition"
              >
                Reset filters
              </button>
            </div>

            <div className="mb-10">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Price Range
              </h3>
              <p className="text-base font-bold text-gray-900 mb-6">
                $0 — ${maxPrice}{" "}
                {maxPrice >= 300 && (
                  <span className="text-gray-400 font-normal">(no limit)</span>
                )}
              </p>
              <Slider
                value={[maxPrice]}
                min={0}
                max={300}
                step={1}
                  onValueChange={(val) => setMaxPrice(Array.isArray(val) ? val[0] : val)}
              />
              <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400">
                <span>$0</span>
                <span>$300</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Quick Select
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[50, 100, 150].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMaxPrice(val)}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                      maxPrice === val
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-900 border-gray-200"
                    }`}
                  >
                    Under ${val}
                  </button>
                ))}
                <button
                  onClick={() => setMaxPrice(300)}
                  className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                    maxPrice === 300
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 border-gray-200"
                  }`}
                >
                  All prices
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-4">
                Categories
              </h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <label
                    key={cat.categoryId}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(cat.categoryId)}
                        onChange={() => handleCatChange(cat.categoryId)}
                        className="size-5 rounded border-gray-300 accent-gray-900"
                      />
                      <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                      {
                        initialProducts.filter(
                          (p) => p.categoryId === cat.categoryId,
                        ).length
                      }
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <p className="text-sm text-gray-500 mb-8 font-medium">
            Showing{" "}
            <span className="text-gray-900 font-bold">
              {filteredProducts.length} products
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ShopCardComponent key={product.productId} product={product} categoryName={categories.find((cat) => cat.categoryId === product.categoryId)?.name || "Unknown"} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 px-6 border-2 border-dashed border-gray-200 rounded-[32px] bg-gray-50/30">
              <h2 className="text-xl font-bold text-gray-900">
                No products match these filters
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Try raising the price limit or clearing category filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setMaxPrice(300);
                  setSelectedCats([]);
                }}
                className="mt-6 rounded-full bg-[#111827] px-8 py-3 text-sm font-bold text-white transition hover:bg-opacity-90 shadow-lg"
              >
                Reset all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
