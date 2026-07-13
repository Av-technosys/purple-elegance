import ProductBenefits from "@/components/product/ProductBenefits";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { products, productDetail } from "@/components/product/product-data";

// Fallback view using mock data — used when product is not yet in the DB
export default function ProductDetailViewMock({ slug }: { slug: string }) {
  const matchedProduct = products.find((p) => p.slug === slug);

  const fallbackName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const product = {
    ...productDetail,
    name: matchedProduct ? matchedProduct.name : fallbackName,
    price: matchedProduct ? matchedProduct.price : productDetail.price,
    slug,
    images: matchedProduct
      ? [
          { src: matchedProduct.image, alt: matchedProduct.name, position: matchedProduct.imagePosition },
          ...productDetail.images.slice(1),
        ]
      : productDetail.images,
  };

  return (
    <main className="bg-white pt-[60px] md:pt-[68px]">
      <section className="mx-auto grid max-w-[1290px] gap-5 px-3 pt-3 pb-9 md:grid-cols-[580px_1fr] md:gap-10 md:px-8 md:pt-14 md:pb-16">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </section>
      <ProductBenefits />
      {/* No attributes yet — will show once product is added to DB */}
      <ProductTabs attributes={[]} />
      <RelatedProducts />
    </main>
  );
}
