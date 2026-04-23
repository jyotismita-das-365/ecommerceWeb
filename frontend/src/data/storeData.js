export const categories = [
  "All",
  "Earbuds",
  "Smartwatch",
  "Mic",
  "Gimbal",
  "Combo",
];

export const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

export const fallbackProducts = [
  {
    id: 1,
    name: "VeldBuds Pro",
    category: "Earbuds",
    price: 2499,
    originalPrice: 4999,
    rating: 4.8,
    badge: "Best Seller",
    description:
      "ANC earbuds tuned for long commutes, calls, and creator work.",
  },
  {
    id: 2,
    name: "VeldWatch X",
    category: "Smartwatch",
    price: 3999,
    originalPrice: 7999,
    rating: 4.7,
    badge: "New",
    description:
      "A premium-looking smartwatch with health tracking and all-day battery life.",
  },
  {
    id: 3,
    name: "VeldMic V1",
    category: "Mic",
    price: 2999,
    originalPrice: 5999,
    rating: 4.9,
    badge: "Creator Pick",
    description:
      "USB-C condenser mic for crisp voiceovers, podcasts, and live streams.",
  },
  {
    id: 4,
    name: "VeldGimbal S3",
    category: "Gimbal",
    price: 4499,
    originalPrice: 8999,
    rating: 4.6,
    badge: "Trending",
    description:
      "3-axis stabilization for cinematic mobile shots and smooth reels.",
  },
  {
    id: 5,
    name: "Creator Combo",
    category: "Combo",
    price: 3999,
    originalPrice: 8999,
    rating: 5,
    badge: "Creator Bundle",
    description:
      "A bundled mic + gimbal setup built for creators who need a fast upgrade.",
  },
  {
    id: 6,
    name: "Studio Headset",
    category: "Earbuds",
    price: 1899,
    originalPrice: 3499,
    rating: 4.5,
    badge: "Budget",
    description:
      "Clear audio, deep comfort, and an easy everyday listening profile.",
  },
];

export const stats = [
  { value: "2-5 Days", label: "Fast delivery" },
  { value: "70%", label: "Savings vs retail" },
  { value: "4.8/5", label: "Average rating" },
  { value: "24/7", label: "Support available" },
];

export const features = [
  {
    title: "Fast Delivery",
    text: "Orders move quickly so your audience and your workflow do not wait.",
  },
  {
    title: "Creator Focused",
    text: "Products are chosen for students, streamers, and content creators first.",
  },
  {
    title: "Quality Tested",
    text: "Every product is reviewed before listing, with useful specs up front.",
  },
  {
    title: "Secure Checkout",
    text: "Cart, totals, and contact details are managed in a clean purchase flow.",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Riya S.",
    city: "Mumbai",
    quote:
      "The earbuds have better ANC than I expected at this price. Great for office travel.",
  },
  {
    id: 2,
    name: "Arjun K.",
    city: "Bangalore",
    quote:
      "The creator bundle made my vlog setup look premium immediately. The mic is very clean.",
  },
  {
    id: 3,
    name: "Priya M.",
    city: "Delhi",
    quote:
      "Fast delivery, solid build quality, and the storefront makes it easy to compare products.",
  },
];
