import { notFound } from "next/navigation";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import ProductView from "./components/product-view";
import { getProductBySlug } from "@/lib/queries/product.queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Aqua Electrical`,
    description: product.description ?? `Buy ${product.name} from Aqua Electrical.`,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground">
      <div className="bg-noise mix-blend-overlay fixed inset-0 z-50 pointer-events-none opacity-40" />
      <Header />
      <ProductView
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: String(product.price),
          thumbnailUrl: product.thumbnailUrl,
          isFeatured: product.isFeatured,
          category: product.category ? { name: product.category.name, slug: product.category.slug } : null,
          brand: product.brand ? { name: product.brand.name, slug: product.brand.slug } : null,
          attributes: (product.productAttributes ?? []).map((pa) => ({
            name: pa.attribute.name,
            value: pa.value,
          })),
        }}
      />
      <Footer />
    </div>
  );
}
