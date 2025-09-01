import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <Link to={"/items/" + item.id} className="item-card-link">
      <div className="card-container">
        <div className="item-card">
          <div className="glow-effect"></div>
          <img src={item.image} className="item-image" />
          <div className="item-info">
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">${item.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
