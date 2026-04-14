"use client";

import Image from "next/image";
import Link from "next/link";
import ButtonAddComponent from "./ButtonAddComponent";

export function StarRow({ rating = 4 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} stars`}>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-sm ${
              i < Math.floor(rating)
                ? "text-amber-400"
                : "text-gray-200"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="ml-1 text-xs tabular-nums text-gray-500 font-medium">
        {Number(rating).toFixed(1)}
      </span>
    </div>
  );
}

export default function ProductCardComponent({ product }) {
  const { productId, productName, price, imageUrl, star } = product;

  const isValidSrc = imageUrl && typeof imageUrl === "string" && imageUrl.trim().length > 0;

  return (
    <article className="group relative rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      <Link href={`/products/${productId}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          {isValidSrc ? (
            <Image
              src={imageUrl}
              alt={productName || "Product image"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition group-hover:scale-[1.02]"
              unoptimized
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
              <span className="text-xs font-bold uppercase tracking-widest">No Image</span>
            </div>
          )}
        </div>
      </Link>

      <div className="relative mt-4 pr-14">
        <StarRow rating={star} />
        <Link href={`/products/${productId}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 hover:text-lime-700">
            {productName}
          </h3>
        </Link>
        <p className="mt-2 text-base font-semibold tabular-nums text-gray-900">
          ${price ? Number(price).toFixed(2) : "0.00"}
        </p>
      </div>

      <div className="absolute bottom-4 right-4">
        <ButtonAddComponent product={product} />
      </div>
    </article>
  );
}