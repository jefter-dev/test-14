import { Link } from "react-router-dom";
import "./not-found-page.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="content">
        <h1 className="glitch" data-text="404">
          404
        </h1>
        <h2>ENDPOINT NOT FOUND</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="home-button">
          RETURN TO HOME BASE
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
