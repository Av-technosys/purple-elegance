import ProductDetailView from "@/components/product/ProductDetailView";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
 console.log("ProductDetailPage slug:", slug);
  return <ProductDetailView slug={slug} />;
}
