import { getProductBySlug } from "@/server/modules/product/product.actions";
import ProductDetailView from "@/components/product/ProductDetailView";
import ProductDetailViewMock from "@/components/product/ProductDetailViewMock";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // If product exists in DB, render with real data
  if (product) {
    return <ProductDetailView product={product} />;
  }

  // Otherwise fall back to mock data (works before DB is seeded)
  return <ProductDetailViewMock slug={slug} />;
}
