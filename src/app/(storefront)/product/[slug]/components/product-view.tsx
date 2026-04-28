'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Heart, Share2, Minus, Plus,
  ChevronRight, Check, Info, Package,
} from 'lucide-react';

type ProductViewProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    thumbnailUrl: string | null;
    isFeatured: boolean;
    category: { name: string; slug: string } | null;
    brand: { name: string; slug: string } | null;
    attributes: { name: string; value: string }[];
  };
};

const TABS = ['Overview', 'Specifications', 'Reviews'] as const;

export default function ProductView({ product }: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Overview');
  const [wishlisted, setWishlisted] = useState(false);

  const price = Number(product.price);
  const formatted = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price);
  const total = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(price * quantity);

  // Determine collection for breadcrumb back-link
  const collectionSlug = product.category?.slug?.startsWith('smart') ||
    product.brand?.slug?.includes('smart')
    ? 'aqua-smart'
    : 'aqua-electrical';

  return (
    <div className="min-h-screen bg-background pb-24 pt-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-foreground/40">
          <Link href="/" className="hover:text-foreground/70 transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${collectionSlug}`} className="hover:text-foreground/70 transition-colors capitalize">
            {collectionSlug.replace('-', ' ')}
          </Link>
          {product.category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/${collectionSlug}/${product.category.slug}`} className="hover:text-foreground/70 transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground/70">{product.name}</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* ── LEFT: Image ─────────────────────────────────────────── */}
          <div className="w-full lg:flex-1">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/70 aspect-square flex items-center justify-center">
              {product.thumbnailUrl ? (
                <Image
                  src={product.thumbnailUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <Package className="h-24 w-24 text-foreground/20" />
              )}
              {product.isFeatured && (
                <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                  Featured
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-card/60 to-transparent pointer-events-none" />
            </div>

            {/* Tabs */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-card/70 backdrop-blur-sm overflow-hidden">
              <div className="flex border-b border-white/5">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-[13px] font-medium transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-foreground/50 hover:text-foreground/80'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'Overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {product.description ? (
                        <p className="text-sm text-foreground/60 leading-relaxed">{product.description}</p>
                      ) : (
                        <p className="text-sm text-foreground/40 italic">No description available.</p>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'Specifications' && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      {product.attributes.length > 0 ? (
                        <div className="divide-y divide-white/5">
                          {product.attributes.map((attr) => (
                            <div key={attr.name} className="flex justify-between py-3">
                              <span className="text-xs text-foreground/50">{attr.name}</span>
                              <span className="text-xs font-semibold text-foreground">{attr.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-12 text-foreground/30">
                          <Info className="h-8 w-8 mb-3" />
                          <p className="text-sm">No specifications listed yet.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'Reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center py-12 text-foreground/30"
                    >
                      <Info className="h-8 w-8 mb-3" />
                      <p className="text-sm">No reviews yet.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Buy Box ───────────────────────────────────────── */}
          <div className="w-full lg:w-[420px] lg:shrink-0 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-card/80 backdrop-blur-sm p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  {product.brand && (
                    <p className="mb-1.5 text-[10px] uppercase tracking-widest text-foreground/40">
                      {product.brand.name}
                    </p>
                  )}
                  <h1 className="text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                    {product.name}
                  </h1>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    onClick={() => setWishlisted((v) => !v)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                      wishlisted
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-white/10 bg-white/[0.04] text-foreground/40 hover:text-foreground/70'
                    }`}
                  >
                    <Heart className="h-4 w-4" fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/40 hover:text-foreground/70 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 pb-6 border-b border-white/5">
                <span className="text-3xl font-black tracking-tight text-foreground">{formatted}</span>
                <p className="mt-1 text-xs text-foreground/40">Inclusive of all taxes</p>
              </div>

              {/* Category tag */}
              {product.category && (
                <div className="mt-5 flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-foreground/50">
                    {product.category.name}
                  </span>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-foreground/50">Quantity</p>
                <div className="inline-flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-10 w-10 items-center justify-center text-foreground/50 transition-colors hover:text-foreground"
                  >
                    <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                  <div className="flex h-10 w-12 items-center justify-center border-x border-white/10 text-sm font-bold text-foreground">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-10 w-10 items-center justify-center text-foreground/50 transition-colors hover:text-foreground"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
                <span className="text-sm text-foreground/50">Total</span>
                <span className="text-2xl font-black tracking-tight text-foreground">{total}</span>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.02]">
                  <Check className="h-4 w-4" />
                  Buy Now
                </button>
              </div>

              {/* Bulk inquiry */}
              <p className="mt-5 text-center text-xs text-foreground/40">
                Need bulk quantities?{' '}
                <button className="text-primary hover:underline underline-offset-4">
                  Enquire now
                </button>
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
