"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import ProductCardComponent from "../ProductCardComponent";

const PAGE_SIZE = 8;

export default function LandingEssentialsGrid({
  token,
  categories,
  products,
  preFetchedData,
}) {
  const [showAll, setShowAll] = useState(false);
  const [tab, setTab] = useState("All");
  const [displayProducts, setDisplayProducts] = useState(products);

  const handleTabChange = (category) => {
    if (category === "All") {
      setTab("All");
      setDisplayProducts(products);
    } else {
      setTab(category.name);
      const products = preFetchedData[category.categoryId] || [];
      setDisplayProducts(products);
    }
  };

  const visible = showAll
    ? displayProducts
    : displayProducts.slice(0, PAGE_SIZE);
  const canLoadMore = !showAll && displayProducts.length > PAGE_SIZE;

  return (
    <section id="shop" className="mx-auto w-full max-w-7xl py-16 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Our skincare essentials
        </h2>
        <p className="mt-2 max-w-lg text-gray-500">
          Filter by routine step — discover the perfect formula for your skin.
        </p>
      </div>

      {token ? (
        <>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            <Button
              onPress={() => handleTabChange("All")}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                tab === "All"
                  ? "bg-lime-400 text-gray-900 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </Button>

            {categories.map((cat) => (
              <Button
                key={cat.categoryId}
                onPress={() => handleTabChange(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  tab === cat.name
                    ? "bg-lime-400 text-gray-900 shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <div>
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {visible.map((product) => (
                <ProductCardComponent
                  product={product}
                  key={product.productId}
                />
              ))}
            </div>

            {displayProducts.length === 0 && (
              <p className="mt-12 text-center text-gray-500">
                No products found in this category.
              </p>
            )}

            {canLoadMore && (
              <div className="mt-12 flex justify-center">
                <Button
                  onPress={() => setShowAll(true)}
                  className="rounded-full border border-gray-200 bg-white px-10 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50"
                >
                  Load more
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex mt-10 flex-col justify-center items-center py-10">
          <Link
            href="/login"
            className="rounded-full mx-auto px-8 py-3 text-sm font-bold transition bg-lime-400 text-gray-900 shadow-sm hover:bg-lime-300"
          >
            Login
          </Link>
          <p className="text-gray-500 mt-5">
            Sign in to browse our skincare essentials
          </p>
        </div>
      )}
    </section>
  );
}
