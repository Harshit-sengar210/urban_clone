export const PRICE_RANGES = [
  { label: "Under ₹500", min: 0, max: 500, value: "0-500" },
  { label: "₹500 - ₹1,000", min: 500, max: 1000, value: "500-1000" },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000, value: "1000-2000" },
  { label: "Above ₹2,000", min: 2000, max: null, value: "2000-plus" },
];

export const RATING_OPTIONS = [
  { label: "4.5 & above", value: "4.5" },
  { label: "4.0 & above", value: "4.0" },
  { label: "3.5 & above", value: "3.5" },
];

export const AVAILABILITY_OPTIONS = [
  { label: "Available Today", value: "today" },
  { label: "Available Tomorrow", value: "tomorrow" },
  { label: "Available This Week", value: "this-week" },
];

export const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "reviews", label: "Most Reviewed" },
];
