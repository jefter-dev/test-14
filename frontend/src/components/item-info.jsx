import { Link } from "react-router-dom";

export default function ItemInfo({ item }) {
  if (!item) return null;

  return (
    <div className="item-details-info">
      <p className="item-details-id">
        Product ID: #{String(item.id).padStart(3, "0")}
      </p>

      <h1 className="item-details-title">{item.name}</h1>

      <p className="item-details-category">{item.category}</p>

      <p className="item-details-price">${item.price}</p>

      <Link to="/" className="back-button">
        &larr; Back to Products
      </Link>
    </div>
  );
}
