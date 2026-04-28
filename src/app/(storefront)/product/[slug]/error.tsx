'use client';

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ProductError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-background text-foreground">
      <AlertCircle className="h-14 w-14 text-destructive/60 mb-5" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-sm text-foreground/50 mb-8 max-w-sm">
        Failed to load this product. Please try again or browse the collection.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground/70 hover:bg-white/[0.08] transition-colors"
        >
          Try again
        </button>
        <Link
          href="/aqua-electrical"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
        >
          Back to collection
        </Link>
      </div>
    </div>
  );
}
