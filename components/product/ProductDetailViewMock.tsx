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

  // Dynamic gallery images mapping based on gender keyword in slug
  const isMen = slug.includes("men") || slug.includes("kurta") || slug.includes("sherwani") || slug.includes("jacket") || slug.includes("shirt");
  const isKids = slug.includes("kids") || slug.includes("boy") || slug.includes("girl") || slug.includes("baby") || slug.includes("lehenga");

  const fallbackImages = isMen
    ? [
        { src: matchedProduct?.image || "/collection-men-1.png", alt: "Men Product front", position: "object-[center_18%]" },
        { src: "/collection-men-2.png", alt: "Men Product detail", position: "object-[center_34%]" },
        { src: "/collection-men-3.png", alt: "Men Product side", position: "object-[center_50%]" },
        { src: "/collection-men-4.png", alt: "Men Product full", position: "object-[center_66%]" },
      ]
    : isKids
    ? [
        { src: matchedProduct?.image || "/collection-3.png", alt: "Kids Product front", position: "object-[center_18%]" },
        { src: "/collection-4.png", alt: "Kids Product detail", position: "object-[center_34%]" },
        { src: "/collection-5.png", alt: "Kids Product side", position: "object-[center_50%]" },
        { src: "/sample-product.png", alt: "Kids Product full", position: "object-[center_66%]" },
      ]
    : matchedProduct
    ? [
        { src: matchedProduct.image, alt: matchedProduct.name, position: matchedProduct.imagePosition || "object-center" },
        ...productDetail.images.slice(1),
      ]
    : productDetail.images;

  const product = {
    ...productDetail,
    name: matchedProduct ? matchedProduct.name : fallbackName,
    price: matchedProduct ? matchedProduct.price : productDetail.price,
    slug,
    images: fallbackImages,
  };

  const fabricVal = isMen ? "100% Premium Cotton / Linen Blend" : isKids ? "Soft Breathable Cotton Blend" : "100% Cotton Twill";
  const fitVal = isMen ? "Regular Fit" : isKids ? "Kids Standard Fit" : "Relaxed Fit";
  const riseVal = isMen ? "Mid-Rise" : isKids ? "Mid-Rise" : "Mid-Rise";
  const patternVal = isMen ? "Intricate Thread Embroidery" : isKids ? "Playful Printed Details" : "Solid";
  const occasionVal = isMen ? "Festive / Wedding Edit" : isKids ? "Festive / Everyday Wear" : "Casual / Streetwear";
  const sustainabilityVal = "Conscious Choice";

  const descriptionText = isMen 
    ? "Designed for everyday elegance. These classic menswear outfits are crafted from premium cotton blend fabrics with a regular fit and neat tailoring details for functionality and style."
    : isKids
    ? "Designed for playful movement. These children's ethnic garments are crafted from lightweight cotton blend fabrics with standard fits and soft stitching for comfortable active wear."
    : "Designed for everyday movement. These utility cargo pants are crafted from premium cotton twill fabric with a relaxed fit and multiple pockets for functionality and style.";

  const descriptionList = isMen
    ? [
        "Regular fit",
        "Classic band collars",
        "Clean side pockets",
        "Intricate thread embroidery",
        "Comfort side slits",
        "Model is 6'1\" and wearing size 40",
      ]
    : isKids
    ? [
        "Soft skin-friendly fabric",
        "Breathable comfort stitches",
        "Elastic waistband details",
        "Lightweight for easy play",
        "Fun festive patterns",
        "Vibrant child-safe colors",
      ]
    : [
        "Relaxed fit",
        "Mid-rise waist",
        "Multiple utility pockets",
        "Button & zip closure",
        "Belt loops",
        "Model is 6'1\" and wearing size 32",
      ];

  const careList = [
    "Machine wash cold",
    "Do not bleach",
    "Tumble dry low",
    "Iron on low heat",
    "Do not dry clean",
  ];

  const detailsList = [
    `Fabric: ${fabricVal}`,
    `Fit: ${fitVal}`,
    `Rise: ${riseVal}`,
    `Pattern: ${patternVal}`,
    `Occasion: ${occasionVal}`,
    `Sustainability: ${sustainabilityVal}`,
  ];

  const column2TextContent = `${fabricVal}\n\nFIT\n${fitVal}\n\nRISE\n${riseVal}\n\nPATTERN\n${patternVal}\n\nOCCASION\n${occasionVal}\n\nSUSTAINABILITY\n${sustainabilityVal}`;

  const mockAttributes = [
    {
      id: "1",
      label: "DESCRIPTION",
      textContent: descriptionText,
      listItems: descriptionList,
      sortOrder: 1,
    },
    {
      id: "2",
      label: "FABRIC",
      textContent: column2TextContent,
      sortOrder: 2,
    },
    {
      id: "3",
      label: "CARE INSTRUCTIONS",
      listItems: careList,
      sortOrder: 3,
    },
    {
      id: "4",
      label: "FABRIC",
      listItems: detailsList,
      sortOrder: 4,
    },
  ];

  return (
    <main className="bg-white pt-[60px] md:pt-[68px]">
      <section className="mx-auto grid max-w-[1290px] gap-5 px-3 pt-3 pb-9 md:grid-cols-[580px_1fr] md:gap-10 md:px-8 md:pt-14 md:pb-16">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </section>
      <ProductBenefits />
      <ProductTabs attributes={mockAttributes} />
      <RelatedProducts slug={slug} />
    </main>
  );
}
