import Link from "next/link";
import { Package } from "lucide-react";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export default function ProductNotFound() {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <Package className="h-16 w-16 text-foreground/20 mb-6" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Product not found</h1>
        <p className="text-sm text-foreground/50 mb-8 max-w-sm">
          This product may have been removed or the link is incorrect.
        </p>
        <div className="flex gap-3">
          <Link
            href="/aqua-electrical"
            className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-foreground/70 hover:bg-white/[0.08] hover:text-foreground transition-colors"
          >
            Aqua Electrical
          </Link>
          <Link
            href="/aqua-smart"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            Aqua Smart
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
