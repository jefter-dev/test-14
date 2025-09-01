import ProductCard from "./product-card";

function ProductGrid({ items }) {
  return (
    <div className="items-grid-container">
      <div className="items-grid">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
