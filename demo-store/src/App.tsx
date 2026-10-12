import { useState } from "react";
import {
  products,
  searchProducts,
  filterProductsByColor,
  filterProductsByCategory,
  findProductsWithinBudget,
  sortProductsByPrice,
  getProductDetails,
  type Product,
} from "./catalog";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>(products);
  const [resultTitle, setResultTitle] = useState("Products");
  const [color, setColor] = useState("black");
  const [category, setCategory] = useState("running");
  const [budget, setBudget] = useState("100");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [productId, setProductId] = useState("1");

  function showResults(title: string, matchingProducts: Product[]) {
    setResultTitle(title);
    setResults(matchingProducts);
  }

  function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    showResults("Search results", searchProducts(query));
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">DEMO STORE</p>

        <h1>Find your next pair.</h1>

        <p className="subtitle">
          Six simple catalog workflows, ready to explore.
        </p>

        <form onSubmit={handleSearch} className="search-form">
          <label htmlFor="search">Search products</label>

          <div className="search-row">
            <input
              id="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="black shoes"
            />

            <button type="submit">
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="workflows" aria-labelledby="workflows-heading">
        <h2 id="workflows-heading">Explore the catalog</h2>
        <div className="workflow-grid">
          <form className="workflow-card" onSubmit={(event) => {
            event.preventDefault();
            showResults("Products by color", filterProductsByColor(color));
          }}>
            <label htmlFor="color">Product color</label>
            <select id="color" name="color" value={color} onChange={(event) => setColor(event.target.value)}>
              {[...new Set(products.map((product) => product.color))].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
            <button type="submit">Filter by color</button>
          </form>

          <form className="workflow-card" onSubmit={(event) => {
            event.preventDefault();
            showResults("Products by category", filterProductsByCategory(category));
          }}>
            <label htmlFor="category">Product category</label>
            <select id="category" name="category" value={category} onChange={(event) => setCategory(event.target.value)}>
              {[...new Set(products.map((product) => product.category))].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
            <button type="submit">Filter by category</button>
          </form>

          <form className="workflow-card" onSubmit={(event) => {
            event.preventDefault();
            showResults("Products within budget", findProductsWithinBudget(Number(budget)));
          }}>
            <label htmlFor="budget">Maximum price ($)</label>
            <input id="budget" name="maxPrice" type="number" min="0" step="0.01" required value={budget} onChange={(event) => setBudget(event.target.value)} />
            <button type="submit">Find within budget</button>
          </form>

          <form className="workflow-card" onSubmit={(event) => {
            event.preventDefault();
            showResults("Products sorted by price", sortProductsByPrice(order));
          }}>
            <label htmlFor="price-order">Price order</label>
            <select id="price-order" name="order" value={order} onChange={(event) => setOrder(event.target.value === "desc" ? "desc" : "asc")}>
              <option value="asc">Lowest price first</option>
              <option value="desc">Highest price first</option>
            </select>
            <button type="submit">Sort by price</button>
          </form>

          <form className="workflow-card" onSubmit={(event) => {
            event.preventDefault();
            const product = getProductDetails(Number(productId));
            showResults("Product details", product ? [product] : []);
          }}>
            <label htmlFor="product-details">Choose a product</label>
            <select id="product-details" name="productId" value={productId} onChange={(event) => setProductId(event.target.value)}>
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
            <button type="submit">View product details</button>
          </form>
        </div>
      </section>

      <section>
        <div className="results-heading">
          <h2 aria-live="polite">{resultTitle}</h2>

          <span>{results.length} found</span>
        </div>

        {results.length === 0 && <p className="empty-results">No products match this request.</p>}
        <div className="grid">
          {results.map((product) => (
            <article className="card" key={product.id}>
              <div className="shoe-placeholder">
                SHOE
              </div>

              <h3>{product.name}</h3>

              <p>
                {product.color} · {product.category}
              </p>

              {resultTitle === "Product details" && <p>Product ID: {product.id}</p>}

              <strong>${product.price}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
