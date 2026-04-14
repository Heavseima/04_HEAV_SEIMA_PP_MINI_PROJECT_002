"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/react";
import { logout } from "../action/authAction";
import { useCartStore } from "@/store/cartStore";

const centerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop", badge: "NEW" },
  { href: "/manage-products", label: "Manage Products" },
  { href: "/orders", label: "Orders" },
];

function CartBagIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

function linkActive(pathname, label) {
  if (label === "Home") return pathname === "/";
  if (label === "Shop") return pathname === "/products" || pathname.startsWith("/products/");
  if (label === "Orders") return pathname === "/orders";
  if (label === "Manage Products") return pathname === "/manage-products";
  return false;
}

function authLinkClass(pathname, path, filled = false) {
  const on = pathname === path;
  if (filled) {
    return on
      ? "rounded-full bg-lime-500 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm"
      : "rounded-full bg-lime-400 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300";
  }
  return on
    ? "rounded-full px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300"
    : "rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 hover:ring-1 hover:ring-gray-200";
}

export default function NavbarComponent({ token }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  // Directly pull the count function
  const { getTotalItems } = useCartStore();
  const totalItemsCount = getTotalItems();

  const cartLabel = totalItemsCount > 0
    ? `Shopping cart, ${totalItemsCount} items`
    : "Shopping cart";

  const linkClass = (active) =>
    `relative flex items-center rounded-full px-3 py-2 text-sm font-medium transition ${
      active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/60 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-3 lg:py-4 px-4">
        <Link href="/" className="z-10 shrink-0 text-lg font-semibold tracking-tight text-gray-900 transition hover:text-lime-700">
          PurelyStore
        </Link>

        {/* Center Nav */}
        <nav className="absolute left-1/2 hidden w-auto -translate-x-1/2 items-center gap-1 md:flex">
          {centerLinks.map(({ href, label, badge }) => {
            const active = linkActive(pathname, label);
            return (
              <Link key={href + label} href={href} className={linkClass(active)}>
                {badge && (
                  <span className="absolute -top-2 z-20 left-1/2 -translate-x-1/2 rounded-full bg-lime-400 px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-gray-900">
                    {badge}
                  </span>
                )}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="z-10 flex items-center gap-2 sm:gap-3">
          {token ? (
            <div className="relative">
              <div
                onClick={() => setOpenLogout((prev) => !prev)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-lime-50 transition"
              >
                <p>U</p>
              </div>
              {openLogout && (
                <div className="absolute top-12 right-0 z-100 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                  <button
                    onClick={() => { logout(); setOpenLogout(false); }}
                    className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className={authLinkClass(pathname, "/login")}>Log in</Link>
              <Link href="/register" className={authLinkClass(pathname, "/register", true)}>Register</Link>
            </div>
          )}

          <Link
            href="/cart"
            aria-label={cartLabel}
            className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
              pathname === "/cart"
                ? "border-lime-500 bg-lime-400 text-gray-900 shadow-inner"
                : "border-gray-200 text-gray-700 hover:border-lime-300 hover:bg-lime-50"
            }`}
          >
            <div className={`relative flex items-center justify-center rounded-full p-1.5 transition-colors ${
              totalItemsCount > 0 ? "text-gray-900" : ""
            }`}>
              <CartBagIcon className="size-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {totalItemsCount}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <Button
            isIconOnly
            variant="light"
            className="h-10 w-10 rounded-full border border-gray-200 md:hidden"
            onPress={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-gray-100 bg-white py-3 md:hidden">
          <div className="mx-auto flex flex-col px-4">
            {centerLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
                {label}
              </Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Cart {totalItemsCount > 0 ? `(${totalItemsCount})` : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}