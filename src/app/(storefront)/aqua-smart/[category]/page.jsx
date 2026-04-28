import { notFound } from "next/navigation";
import { getCategoryBySlug, getChildCategories } from "@/lib/queries/category.queries";
import { getProducts } from "@/lib/queries/product.queries";
import CollectionCategoryView from "@/components/blocks/v2/collection-category-view";

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.name} | Aqua Smart`,
    description: category.description ?? `Browse ${category.name} smart home products.`,
  };
}

export default async function AquaSmartCategoryPage({ params, searchParams }) {
  const { category: slug } = await params;
  const { sort = "newest" } = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [subcategories, productsResult] = await Promise.all([
    getChildCategories(category.id),
    getProducts({
      categorySlug: slug,
      isActive: true,
      pageSize: 48,
      sortBy: sort,
    }),
  ]);

  const breadcrumbs = [
    { name: "Aqua Smart", slug: null },
    { name: category.name, slug: null },
  ];

  return (
    <CollectionCategoryView
      collection="aqua-smart"
      category={{
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        imageUrl: category.imageUrl,
      }}
      subcategories={subcategories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      }))}
      products={productsResult.data.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        thumbnailUrl: p.thumbnailUrl,
        isFeatured: p.isFeatured,
        brand: p.brand ? { name: p.brand.name } : null,
      }))}
      total={productsResult.total}
      breadcrumbs={breadcrumbs}
    />
  );
}
