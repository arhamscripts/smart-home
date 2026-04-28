import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import HeroSmartV2 from "./components/hero-smart-v2";
import SmartCategories from "./components/smart-categories";
import SmartProductsV2 from "./components/smart-products-v2";
import VideoBanner from "./components/video-banner";
import InnovationSpotlight from "@/components/blocks/v2/innovation-spotlight";
import TrustStats from "@/components/blocks/v2/trust-stats";
import { getCategoryBySlug, getChildCategories } from "@/lib/queries/category.queries";
import { getProducts } from "@/lib/queries/product.queries";

export const metadata = {
  title: "Aqua Smart — Intelligent Home Automation",
  description:
    "Wi-Fi switches, voice-ready lighting, scene automations and sensors — a complete smart ecosystem for every home.",
};

async function fetchSmartData() {
  try {
    const parentCategory = await getCategoryBySlug("aqua-smart");
    if (!parentCategory) return { categories: [], products: [] };

    const [childCategories, productsResult] = await Promise.all([
      getChildCategories(parentCategory.id),
      getProducts({ categorySlug: "aqua-smart", isFeatured: true, pageSize: 4, sortBy: "newest" }),
    ]);

    return {
      categories: childCategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        productCount: null,
      })),
      products: productsResult.data.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        thumbnailUrl: p.thumbnailUrl,
        isFeatured: p.isFeatured,
        category: p.category ? { name: p.category.name } : null,
        brand: p.brand ? { name: p.brand.name } : null,
        productAttributes: (p.productAttributes ?? []).map((pa) => ({ value: pa.value })),
      })),
    };
  } catch {
    return { categories: [], products: [] };
  }
}

export default async function AquaSmartPage() {
  const { categories, products } = await fetchSmartData();

  return (
    <div className="relative w-full overflow-x-clip bg-background text-foreground">
      <div className="bg-noise mix-blend-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />
      <Header />
      <main>
        <HeroSmartV2 />
        <SmartCategories dbCategories={categories} />
        <SmartProductsV2 products={products} />
        <VideoBanner />
        <InnovationSpotlight />
        <TrustStats />
      </main>
      <Footer />
    </div>
  );
}
