import { Link } from "react-router-dom";

export default function ItemNotFound({ message, linkTo, linkText }) {
  return (
    <div className="not-found-container">
      <h2>SIGNAL LOST</h2>
      <p>{message}</p>
      <Link to={linkTo}>{linkText}</Link>
    </div>
  );
}
