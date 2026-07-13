import ProductBenefits from "@/components/product/ProductBenefits";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

export default function ProductDetailView({ product }: { product: any }) {
  // Map database images to the gallery format
  const mappedImages = product.images && product.images.length > 0
    ? product.images.map((img: any) => ({
        src: img.url,
        alt: img.altText || product.name,
        position: "object-center",
      }))
    : [
        {
          src: "/sample-product.png",
          alt: product.name,
          position: "object-center",
        },
      ];

  // Map variants to extract sizes and colors if available
  const sizes = product.variants && product.variants.length > 0
    ? (Array.from(new Set(product.variants.map((v: any) => v.size).filter(Boolean))) as string[])
    : ["XS", "S", "M", "L", "XL", "XXL"]; // fallbacks if no variants

  // Map database product fields to UI format
  const formattedProduct = {
    name: product.name,
    slug: product.slug,
    subtitle: product.tags && product.tags.length > 0 ? product.tags.join(" • ") : "Premium Collection",
    price: `₹${Math.round(parseFloat(product.price))}`,
    originalPrice: product.comparePrice ? `₹${Math.round(parseFloat(product.comparePrice))}` : "",
    discount: product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price)
      ? `${Math.round(((parseFloat(product.comparePrice) - parseFloat(product.price)) / parseFloat(product.comparePrice)) * 100)}% OFF`
      : "",
    rating: "4.5", // Mock default
    reviews: 12,   // Mock default
    color: product.variants?.[0]?.color || "Default",
    images: mappedImages,
    sizes,
  };

  return (
    <main className="bg-white pt-[60px] md:pt-[68px]">
      <section className="mx-auto grid max-w-[1290px] gap-5 px-3 pt-3 pb-9 md:grid-cols-[580px_1fr] md:gap-10 md:px-8 md:pt-14 md:pb-16">
        <ProductGallery product={formattedProduct as any} />
        <ProductInfo product={formattedProduct as any} />
      </section>
      <ProductBenefits />
      <ProductTabs description={product.description} />
      <RelatedProducts />
    </main>
  );
}
