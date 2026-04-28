"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, SlidersHorizontal, Package } from "lucide-react";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name A–Z" },
];

export default function CollectionCategoryView({
  collection,        // "aqua-smart" | "aqua-electrical"
  category,          // { id, name, slug, description, imageUrl }
  subcategories,     // Category[]
  products,          // ProductWithRelations[]
  total,
  breadcrumbs,       // [{ name, slug | null }]  root → … → current
}) {
  const [sort, setSort] = useState("newest");
  const [showSort, setShowSort] = useState(false);

  const collectionBase = `/${collection}`;

  return (
    <div className="min-h-screen bg-background">
      {/* ── Category Hero ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-background pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-grid-dots [mask-image:radial-gradient(800px_400px_at_50%_60%,black,transparent)]"
        />
        <div
          aria-hidden
          className="hero-orb absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/30 blur-[110px] opacity-60"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-foreground/40">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
                {crumb.slug ? (
                  <Link
                    href={i === 0 ? collectionBase : `${collectionBase}/${crumb.slug}`}
                    className="hover:text-foreground/70 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground/70">{crumb.name}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight leading-tight text-foreground">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-3 text-sm text-foreground/55 sm:text-base leading-relaxed">
                {category.description}
              </p>
            )}
            <p className="mt-2 text-xs text-foreground/35">
              {total} product{total !== 1 ? "s" : ""}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Subcategories ─────────────────────────────────────────── */}
      {subcategories.length > 0 && (
        <section className="border-y border-white/5 bg-card/30 py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-5 text-[11px] uppercase tracking-widest text-foreground/40">
              Sub-categories
            </p>
            <div className="flex flex-wrap gap-3">
              {subcategories.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={`${collectionBase}/${sub.slug}`}
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground/70 transition-all hover:border-primary/40 hover:bg-white/[0.08] hover:text-foreground"
                  >
                    {sub.name}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sort / Filter Bar ──────────────────────────────────────── */}
      <div className="sticky top-16 z-30 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <span className="text-xs text-foreground/40">
            {total} result{total !== 1 ? "s" : ""}
          </span>

          <div className="relative">
            <button
              onClick={() => setShowSort((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-foreground/70 transition-colors hover:bg-white/[0.08]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Sort: {SORT_OPTIONS.find((o) => o.value === sort)?.label}
            </button>

            {showSort && (
              <div className="absolute right-0 top-full mt-1.5 w-48 overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/[0.06] ${
                      sort === opt.value ? "text-primary" : "text-foreground/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Products Grid ─────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package className="h-12 w-12 text-foreground/20 mb-4" />
              <p className="text-foreground/40 text-sm">No products found in this category yet.</p>
              <Link
                href={collectionBase}
                className="mt-6 text-xs text-primary hover:underline"
              >
                ← Back to collection
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} collectionBase={collectionBase} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, index, collectionBase }) {
  const price = Number(product.price);
  const formatted = new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:bg-card"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
          {product.thumbnailUrl ? (
            <Image
              src={product.thumbnailUrl}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-10 w-10 text-foreground/20" />
            </div>
          )}
          {product.isFeatured && (
            <span className="absolute left-3 top-3 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary border border-primary/20">
              Featured
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/80 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-4">
          {product.brand && (
            <p className="mb-0.5 text-[10px] uppercase tracking-widest text-foreground/40">
              {product.brand.name}
            </p>
          )}
          <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-primary">{formatted}</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] opacity-0 transition-all group-hover:opacity-100 group-hover:border-primary/40">
              <ArrowUpRight className="h-3.5 w-3.5 text-foreground/60" />
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-primary/60 via-accent/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      </Link>
    </motion.div>
  );
}
