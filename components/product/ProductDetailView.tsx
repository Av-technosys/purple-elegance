import ProductBenefits from "@/components/product/ProductBenefits";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { productDetail } from "@/components/product/product-data";

export default function ProductDetailView({ slug }: { slug: string }) {
  const product = {
    ...productDetail,
    slug,
  };

  return (
    <main className="bg-white pt-[60px] md:pt-[68px]">
      <section className="mx-auto grid max-w-[1290px] gap-5 px-3 pt-3 pb-9 md:grid-cols-[580px_1fr] md:gap-10 md:px-8 md:pt-14 md:pb-16">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </section>
      <ProductBenefits />
      <ProductTabs />
      <RelatedProducts />
    </main>
  );
}
