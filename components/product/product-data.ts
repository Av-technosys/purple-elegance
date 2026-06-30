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
    image: "/sample-product.png",
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
    image: "/sample-product.png",
    imagePosition: "object-[center_50%]",
  },
  {
    name: "Red Embroidered Suit",
    slug: "red-embroidered-suit",
    price: "₹1,099",
    image: "/sample-product.png",
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
    image: "/sample-product.png",
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
    image: "/sample-product.png",
    imagePosition: "object-[center_38%]",
  },
  {
    name: "Beige Embroidered Suit",
    slug: "beige-embroidered-suit-3",
    price: "₹1,099",
    image: "/sample-product.png",
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
