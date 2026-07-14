export type Product = {
  name: string;
  slug: string;
  price: string;
  image: string;
  imagePosition: string;
};

export type ProductDetail = {
  name: string;
  slug: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: string;
  reviews: number;
  color: string;
  images: {
    src: string;
    alt: string;
    position: string;
  }[];
  sizes: string[];
};

export const products: Product[] = [
  {
    name: "Pink Floral Co-ord Set",
    slug: "pink-floral-co-ord-set",
    price: "₹1,099",
    image: "/kurti-2.png",
    imagePosition: "object-[center_34%]",
  },
  {
    name: "Yellow Floral Anarkali",
    slug: "yellow-floral-anarkali",
    price: "₹1,099",
    image: "/sample-product.png",
    imagePosition: "object-[center_66%]",
  },
  {
    name: "Beige Embroidered Suit",
    slug: "beige-embroidered-suit",
    price: "₹1,099",
    image: "/kurti-2.png",
    imagePosition: "object-[center_50%]",
  },
  {
    name: "Red Embroidered Suit",
    slug: "red-embroidered-suit",
    price: "₹1,099",
    image: "/kurti-1.png",
    imagePosition: "object-[center_18%]",
  },
  {
    name: "Red Embroidered Suit",
    slug: "red-embroidered-suit-2",
    price: "₹1,099",
    image: "/sample-product.png",
    imagePosition: "object-[center_20%]",
  },
  {
    name: "Yellow Floral Anarkali",
    slug: "yellow-floral-anarkali-2",
    price: "₹1,099",
    image: "/kurti-1.png",
    imagePosition: "object-[center_62%]",
  },
  {
    name: "Beige Embroidered Suit",
    slug: "beige-embroidered-suit-2",
    price: "₹1,099",
    image: "/sample-product.png",
    imagePosition: "object-[center_52%]",
  },
  {
    name: "Pink Floral Co-ord Set",
    slug: "pink-floral-co-ord-set-2",
    price: "₹1,099",
    image: "/kurti-2.png",
    imagePosition: "object-[center_38%]",
  },
  {
    name: "Beige Embroidered Suit",
    slug: "beige-embroidered-suit-3",
    price: "₹1,099",
    image: "/kurti-1.png",
    imagePosition: "object-[center_50%]",
  },
  {
    name: "Red Embroidered Suit",
    slug: "red-embroidered-suit-3",
    price: "₹1,099",
    image: "/sample-product.png",
    imagePosition: "object-[center_19%]",
  },
  {
    name: "Pink Floral Co-ord Set",
    slug: "pink-floral-co-ord-set-3",
    price: "₹1,099",
    image: "/sample-product.png",
    imagePosition: "object-[center_35%]",
  },
  {
    name: "Yellow Floral Anarkali",
    slug: "yellow-floral-anarkali-3",
    price: "₹1,099",
    image: "/sample-product.png",
    imagePosition: "object-[center_64%]",
  },
  // Men's Products
  { name: "Classic Men's Kurta", slug: "classic-mens-kurta", price: "₹1,499", image: "/collection-men-1.png", imagePosition: "object-[center_18%]" },
  { name: "Elegant Men's Suit", slug: "elegant-mens-suit", price: "₹2,499", image: "/collection-men-2.png", imagePosition: "object-[center_34%]" },
  { name: "Traditional Sherwani", slug: "traditional-sherwani", price: "₹3,999", image: "/collection-men-3.png", imagePosition: "object-[center_50%]" },
  { name: "Designer Nehru Jacket", slug: "designer-nehru-jacket", price: "₹1,899", image: "/collection-men-4.png", imagePosition: "object-[center_66%]" },
  { name: "Men's Pathani Set", slug: "mens-pathani-set", price: "₹2,199", image: "/collection-men-5.png", imagePosition: "object-[center_24%]" },
  { name: "Linen Blend Ethnic Shirt", slug: "linen-blend-ethnic-shirt", price: "₹1,299", image: "/collection-men-1.png", imagePosition: "object-[center_38%]" },
  { name: "Classic Men's Kurta 2", slug: "classic-mens-kurta-2", price: "₹1,499", image: "/collection-men-2.png", imagePosition: "object-[center_18%]" },
  { name: "Elegant Men's Suit 2", slug: "elegant-mens-suit-2", price: "₹2,499", image: "/collection-men-3.png", imagePosition: "object-[center_34%]" },
  { name: "Traditional Sherwani 2", slug: "traditional-sherwani-2", price: "₹3,999", image: "/collection-men-4.png", imagePosition: "object-[center_50%]" },
  { name: "Designer Nehru Jacket 2", slug: "designer-nehru-jacket-2", price: "₹1,899", image: "/collection-men-5.png", imagePosition: "object-[center_66%]" },

  // Kids' Products
  { name: "Kids' Festive Kurta", slug: "kids-festive-kurta", price: "₹799", image: "/collection-3.png", imagePosition: "object-[center_18%]" },
  { name: "Kids' Embroidered Lehenga", slug: "kids-embroidered-lehenga", price: "₹1,699", image: "/collection-4.png", imagePosition: "object-[center_34%]" },
  { name: "Kids' Party Wear Suit", slug: "kids-party-wear-suit", price: "₹1,299", image: "/collection-5.png", imagePosition: "object-[center_50%]" },
  { name: "Little Prince Sherwani", slug: "little-prince-sherwani", price: "₹1,999", image: "/sample-product.png", imagePosition: "object-[center_66%]" },
  { name: "Baby Boy Dhoti Set", slug: "baby-boy-dhoti-set", price: "₹999", image: "/collection-3.png", imagePosition: "object-[center_24%]" },
  { name: "Girls' Floral Anarkali", slug: "girls-floral-anarkali", price: "₹1,199", image: "/collection-4.png", imagePosition: "object-[center_38%]" },
  { name: "Kids' Festive Kurta 2", slug: "kids-festive-kurta-2", price: "₹799", image: "/collection-5.png", imagePosition: "object-[center_18%]" },
  { name: "Kids' Embroidered Lehenga 2", slug: "kids-embroidered-lehenga-2", price: "₹1,699", image: "/sample-product.png", imagePosition: "object-[center_34%]" },
  { name: "Kids' Party Wear Suit 2", slug: "kids-party-wear-suit-2", price: "₹1,299", image: "/collection-3.png", imagePosition: "object-[center_50%]" },
  { name: "Little Prince Sherwani 2", slug: "little-prince-sherwani-2", price: "₹1,999", image: "/collection-4.png", imagePosition: "object-[center_66%]" },
];

export const categories = [
  "All",
  "Anarkali Suits",
  "Kurta Sets",
  "Ethnic Wear",
  "Lehengas",
  "Sharara Sets",
  "Festive Collection",
  "Palazzo Sets",
  "Kurtis",
];

export const productDetail: ProductDetail = {
  name: "Red Embroidered Suit",
  slug: "red-embroidered-suit",
  subtitle: "Ethnic Wear Embroidered Suit",
  price: "₹1,999",
  originalPrice: "₹2,399",
  discount: "20% OFF",
  rating: "4/5",
  reviews: 368,
  color: "Light Blue",
  images: [
    {
      src: "/collection-1.png",
      alt: "Red embroidered suit front view",
      position: "object-[58%_center]",
    },
    {
      src: "/collection-1.png",
      alt: "Red embroidered suit angled view",
      position: "object-[50%_center]",
    },
    {
      src: "/collection-1.png",
      alt: "Red embroidered suit detail view",
      position: "object-[64%_center]",
    },
    {
      src: "/collection-1.png",
      alt: "Red embroidered suit full look",
      position: "object-[42%_center]",
    },
  ],
  sizes: ["28", "30", "32", "34", "36", "38"],
};
