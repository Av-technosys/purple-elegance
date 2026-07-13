import { usePathname } from "next/navigation";

export type GenderType = "men" | "women" | "kids";

export function useGenderTheme() {
  const pathname = usePathname();
  
  let gender: GenderType = "women";
  if (pathname?.startsWith("/men")) {
    gender = "men";
  } else if (pathname?.startsWith("/kids")) {
    gender = "kids";
  }

  // Resolve theme configuration
  const config = {
    gender,
    heroBannerDesktop: {
      men: "/images/banners/men.jpg",
      women: "/home-banner.png",
      kids: "/images/banners/kids.jpg",
    }[gender],
    heroBannerMobile: {
      men: "/images/banners/men.jpg",
      women: "/mobile-banner.png",
      kids: "/images/banners/kids.jpg",
    }[gender],
    heritageBgDesktop: {
      men: "/heritage-thread-men-bg.png",
      women: "/heritage-thread-bg.png",
      kids: "/heritage-thread-bg.png",
    }[gender],
    heritageBgMobile: {
      men: "/heritage-thread-men-bg.png",
      women: "/heritage-mobile.png",
      kids: "/heritage-mobile.png",
    }[gender],
    madeforBgDesktop: {
      men: "/madefor-men.png",
      women: "/madefor.png",
      kids: "/collection-5.png",
    }[gender],
    madeforBgMobile: {
      men: "/madefor-men.png",
      women: "/madefor-mobile.png",
      kids: "/collection-5.png",
    }[gender],
    stayConnectedBg: {
      men: "/stay-connected-men.png",
      women: "/stay-connected.png",
      kids: "/stay-connected.png",
    }[gender],
    heroTitle: {
      men: "MEN Collection",
      women: "WOMEN Collection",
      kids: "KIDS Collection",
    }[gender],
    heroSubtitle: {
      men: "Elevate Your Everyday Style.",
      women: "Elevate Your Everyday Style.",
      kids: "Colorful & Playful Festive Designs.",
    }[gender],
    heroDesc: {
      men: "Premium fits. Timeless looks. Made for you.",
      women: "Premium fits. Timeless looks. Made for you.",
      kids: "Comfy fabrics. Fun styles. Made for your little ones.",
    }[gender],
    featuredCollections: {
      men: [
        { title: "Classic Kurta Sets", categoryKey: "Kurta Sets", description: "Sophisticated designs tailored for elegant looks", image: "/collection-men-1.png", position: "object-[center_18%]" },
        { title: "Festive Sherwanis", categoryKey: "Ethnic Wear", description: "Celebrate your grand moments with heritage details", image: "/collection-men-2.png", position: "object-[center_34%]" },
        { title: "Nehru Jackets", categoryKey: "Kurtis", description: "Stylized layers to complete your wedding look", image: "/collection-men-3.png", position: "object-[center_28%]", featured: true },
        { title: "Pathani Suits", categoryKey: "Ethnic Wear", description: "Comfortable and casual traditional silhouettes", image: "/collection-men-4.png", position: "object-[center_42%]" },
        { title: "Linen Shirts", categoryKey: "Kurtis", description: "Lightweight styles for everyday comfort", image: "/collection-men-5.png", position: "object-[center_55%]" },
      ],
      kids: [
        { title: "Festive wear", categoryKey: "Kurta Sets", description: "Bright & cheerful patterns for celebration days", image: "/collection-3.png", position: "object-[center_18%]" },
        { title: "Dhoti Sets", categoryKey: "Kurta Sets", description: "Lightweight and easy-breathe designs for active boys", image: "/collection-4.png", position: "object-[center_34%]" },
        { title: "Lehenga Sets", categoryKey: "Ethnic Wear", description: "Sweet details and vibrant colors for girls", image: "/collection-5.png", position: "object-[center_28%]", featured: true },
        { title: "Kurti Sets", categoryKey: "Kurtis", description: "Playful designs for family gatherings", image: "/collection-3.png", position: "object-[center_42%]" },
        { title: "Festive Frocks", categoryKey: "Kurtis", description: "Soft cotton comfort with beautiful print accents", image: "/collection-4.png", position: "object-[center_55%]" },
      ],
      women: [
        { title: "Festive Collection", categoryKey: "Festive Collection", description: "Celebrate in style with prints that speak elegance", image: "/sample-product.png", position: "object-[center_34%]" },
        { title: "Co-ord Sets", categoryKey: "Kurta Sets", description: "Celebrate in style with prints that speak elegance", image: "/sample-product.png", position: "object-[center_18%]" },
        { title: "Floral Anarkali", categoryKey: "Anarkali Suits", description: "Celebrate in style with prints that speak elegance", image: "/sample-product.png", position: "object-[center_28%]", featured: true },
        { title: "Embroidered Suit", categoryKey: "Ethnic Wear", description: "Celebrate in style with prints that speak elegance", image: "/sample-product.png", position: "object-[center_42%]" },
        { title: "Everyday Elegance", categoryKey: "Kurtis", description: "Celebrate in style with prints that speak elegance", image: "/sample-product.png", position: "object-[center_55%]" },
      ]
    }[gender],
    exploreCollections: {
      men: [
        { title: "WEDDING EDIT", image: "/collection-men-1.png", className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]" },
        { title: "FESTIVE COLLECTION", image: "/collection-men-2.png", className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]" },
        { title: "PARTY WEAR", image: "/collection-men-3.png", className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]" },
        { title: "EVERYDAY WEAR", image: "/collection-men-4.png", className: "col-span-1 row-span-2 md:col-span-2 md:row-span-1 min-h-[334px] sm:min-h-[514px] md:min-h-[250px]" },
        { title: "SUMMER COLLECTION", image: "/collection-men-5.png", className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]" },
      ],
      kids: [
        { title: "WEDDING EDIT", image: "/collection-3.png", className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]" },
        { title: "FESTIVE COLLECTION", image: "/collection-4.png", className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]" },
        { title: "PARTY WEAR", image: "/collection-5.png", className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]" },
        { title: "EVERYDAY WEAR", image: "/collection-3.png", className: "col-span-1 row-span-2 md:col-span-2 md:row-span-1 min-h-[334px] sm:min-h-[514px] md:min-h-[250px]" },
        { title: "SUMMER COLLECTION", image: "/collection-4.png", className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]" },
      ],
      women: [
        { title: "WEDDING EDIT", image: "/collection-1.png", className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]" },
        { title: "FESTIVE COLLECTION", image: "/collection-2.png", className: "col-span-2 md:col-span-3 min-h-[215px] sm:min-h-[250px]" },
        { title: "PARTY WEAR", image: "/collection-3.png", className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]" },
        { title: "EVERYDAY WEAR", image: "/collection-4.png", className: "col-span-1 row-span-2 md:col-span-2 md:row-span-1 min-h-[334px] sm:min-h-[514px] md:min-h-[250px]" },
        { title: "SUMMER COLLECTION", image: "/collection-5.png", className: "col-span-1 md:col-span-2 min-h-[160px] sm:min-h-[250px]" },
      ]
    }[gender],
    products: {
      men: [
        { name: "Classic Men's Kurta", slug: "classic-mens-kurta", price: "₹1,499", image: "/collection-men-1.png", position: "object-[center_18%]" },
        { name: "Elegant Men's Suit", slug: "elegant-mens-suit", price: "₹2,499", image: "/collection-men-2.png", position: "object-[center_34%]" },
        { name: "Traditional Sherwani", slug: "traditional-sherwani", price: "₹3,999", image: "/collection-men-3.png", position: "object-[center_50%]" },
        { name: "Designer Nehru Jacket", slug: "designer-nehru-jacket", price: "₹1,899", image: "/collection-men-4.png", position: "object-[center_66%]" },
        { name: "Men's Pathani Set", slug: "mens-pathani-set", price: "₹2,199", image: "/collection-men-5.png", position: "object-[center_24%]" },
        { name: "Linen Blend Ethnic Shirt", slug: "linen-blend-ethnic-shirt", price: "₹1,299", image: "/collection-men-1.png", position: "object-[center_38%]" },
        { name: "Classic Men's Kurta 2", slug: "classic-mens-kurta-2", price: "₹1,499", image: "/collection-men-2.png", position: "object-[center_18%]" },
        { name: "Elegant Men's Suit 2", slug: "elegant-mens-suit-2", price: "₹2,499", image: "/collection-men-3.png", position: "object-[center_34%]" },
        { name: "Traditional Sherwani 2", slug: "traditional-sherwani-2", price: "₹3,999", image: "/collection-men-4.png", position: "object-[center_50%]" },
        { name: "Designer Nehru Jacket 2", slug: "designer-nehru-jacket-2", price: "₹1,899", image: "/collection-men-5.png", position: "object-[center_66%]" },
      ],
      kids: [
        { name: "Kids' Festive Kurta", slug: "kids-festive-kurta", price: "₹799", image: "/collection-3.png", position: "object-[center_18%]" },
        { name: "Kids' Embroidered Lehenga", slug: "kids-embroidered-lehenga", price: "₹1,699", image: "/collection-4.png", position: "object-[center_34%]" },
        { name: "Kids' Party Wear Suit", slug: "kids-party-wear-suit", price: "₹1,299", image: "/collection-5.png", position: "object-[center_50%]" },
        { name: "Little Prince Sherwani", slug: "little-prince-sherwani", price: "₹1,999", image: "/sample-product.png", position: "object-[center_66%]" },
        { name: "Baby Boy Dhoti Set", slug: "baby-boy-dhoti-set", price: "₹999", image: "/collection-3.png", position: "object-[center_24%]" },
        { name: "Girls' Floral Anarkali", slug: "girls-floral-anarkali", price: "₹1,199", image: "/collection-4.png", position: "object-[center_38%]" },
        { name: "Kids' Festive Kurta 2", slug: "kids-festive-kurta-2", price: "₹799", image: "/collection-5.png", position: "object-[center_18%]" },
        { name: "Kids' Embroidered Lehenga 2", slug: "kids-embroidered-lehenga-2", price: "₹1,699", image: "/sample-product.png", position: "object-[center_34%]" },
        { name: "Kids' Party Wear Suit 2", slug: "kids-party-wear-suit-2", price: "₹1,299", image: "/collection-3.png", position: "object-[center_50%]" },
        { name: "Little Prince Sherwani 2", slug: "little-prince-sherwani-2", price: "₹1,999", image: "/collection-4.png", position: "object-[center_66%]" },
      ],
      women: [
        { name: "Red Embroidered Suit", slug: "red-embroidered-suit", price: "₹1,999", image: "/kurti-1.png", position: "object-[center_18%]" },
        { name: "Pink Floral Co-ord Set", slug: "pink-floral-co-ord-set", price: "₹1,099", image: "/kurti-2.png", position: "object-[center_34%]" },
        { name: "Beige Embroidered Suit", slug: "beige-embroidered-suit", price: "₹1,099", image: "/kurti-2.png", position: "object-[center_50%]" },
        { name: "Yellow Floral Anarkali", slug: "yellow-floral-anarkali", price: "₹1,099", image: "/sample-product.png", position: "object-[center_66%]" },
        { name: "Cocktail Midi Dress", slug: "cocktail-midi-dress", price: "₹1,599", image: "/explore-collection.png", position: "object-[center_24%]" },
        { name: "Pink Floral Co-ord Set", slug: "pink-floral-co-ord-set-2", price: "₹1,099", image: "/kurti-2.png", position: "object-[center_38%]" },
        { name: "Cocktail Midi Dress 2", slug: "cocktail-midi-dress-2", price: "₹1,599", image: "/explore-collection.png", position: "object-[center_22%]" },
        { name: "Yellow Floral Anarkali 2", slug: "yellow-floral-anarkali-2", price: "₹1,099", image: "/sample-product.png", position: "object-[center_62%]" },
        { name: "Beige Embroidered Suit 2", slug: "beige-embroidered-suit-2", price: "₹1,099", image: "/kurti-2.png", position: "object-[center_52%]" },
        { name: "Red Embroidered Suit 2", slug: "red-embroidered-suit-2", price: "₹1,999", image: "/kurti-1.png", position: "object-[center_20%]" },
      ]
    }[gender]
  };

  return config;
}
