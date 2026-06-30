import StayConnected from "@/components/home/StayConnected";
import ProductBanner from "@/components/product/ProductBanner";
import ProductFilters, {
  MobileFilterBar,
  ProductCategoryTabs,
  SortSelect,
} from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";

const Page = () => {
  return (
    <main className="bg-white">
      <ProductBanner />
      <ProductCategoryTabs />
      <MobileFilterBar />
      <section className="mx-auto flex max-w-305 gap-8 px-4 py-6 md:px-6 md:py-8">
        <ProductFilters />
        <div className="min-w-0 flex-1">
          <div className="mb-4 hidden justify-end md:flex">
            <SortSelect />
          </div>
          <ProductGrid />
        </div>
      </section>
      <StayConnected/>
    </main>
  );
};

export default Page;
