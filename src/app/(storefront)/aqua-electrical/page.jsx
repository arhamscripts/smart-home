import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import HeroElectrical from "./components/hero-electrical";
import ElectricalCategories from "./components/electrical-categories";
import ElectricalProducts from "./components/electrical-products";
import ElectricalFeatures from "./components/electrical-features";
import WhyChooseUs from "@/components/blocks/v2/why-choose-us";
import TrustStats from "@/components/blocks/v2/trust-stats";
import { getCategoryBySlug, getChildCategories } from "@/lib/queries/category.queries";
import { getProducts } from "@/lib/queries/product.queries";

export const metadata = {
  title: "Aqua Electrical — Premium Traditional Electrical Collection",
  description:
    "Precision switchgear, sockets and accessories engineered to last decades — the quiet, dependable layer behind every great home.",
};

async function fetchElectricalData() {
  try {
    const parentCategory = await getCategoryBySlug("aqua-electrical");
    if (!parentCategory) return { categories: [], products: [] };

    const [childCategories, productsResult] = await Promise.all([
      getChildCategories(parentCategory.id),
      getProducts({ categorySlug: "aqua-electrical", isFeatured: true, pageSize: 4, sortBy: "newest" }),
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

export default async function AquaElectricalPage() {
  const { categories, products } = await fetchElectricalData();

  return (
    <div className="relative w-full overflow-x-clip bg-background text-foreground">
      <div className="bg-noise mix-blend-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />
      <Header />
      <main>
        <HeroElectrical />
        <ElectricalCategories dbCategories={categories} />
        <ElectricalProducts products={products} />
        <ElectricalFeatures />
        <WhyChooseUs />
        <TrustStats />
      </main>
      <Footer />
    </div>
  );
}
