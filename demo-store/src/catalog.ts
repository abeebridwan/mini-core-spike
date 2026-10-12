export type Product = {
  id: number;
  name: string;
  color: string;
  category: string;
  price: number;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Black Running Shoes",
    color: "black",
    category: "running",
    price: 89,
  },
  {
    id: 2,
    name: "White Running Shoes",
    color: "white",
    category: "running",
    price: 95,
  },
  {
    id: 3,
    name: "Black Trail Shoes",
    color: "black",
    category: "trail",
    price: 109,
  },
  {
    id: 4,
    name: "Blue Walking Shoes",
    color: "blue",
    category: "walking",
    price: 70,
  },
];

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return products;
  }

  const terms = normalized.split(/\s+/);

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.color,
      product.category,
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}

export function filterProductsByColor(color: string): Product[] {
  const normalized = color.trim().toLowerCase();
  return products.filter((product) => product.color === normalized);
}

export function filterProductsByCategory(category: string): Product[] {
  const normalized = category.trim().toLowerCase();
  return products.filter((product) => product.category === normalized);
}

export function findProductsWithinBudget(maxPrice: number): Product[] {
  if (!Number.isFinite(maxPrice) || maxPrice < 0) return [];
  return products.filter((product) => product.price <= maxPrice);
}

export function sortProductsByPrice(order: "asc" | "desc"): Product[] {
  return [...products].sort((first, second) =>
    order === "desc" ? second.price - first.price : first.price - second.price,
  );
}

export function getProductDetails(productId: number): Product | null {
  return products.find((product) => product.id === productId) ?? null;
}
