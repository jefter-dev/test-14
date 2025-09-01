import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../state/data-context";
import Loader from "../components/loader";
import "./item-details-page.css";
import ItemNotFound from "../components/item-not-found";
import ItemImage from "../components/item-image";
import ItemInfo from "../components/item-info";

function ItemDetails() {
  const { id } = useParams();
  const { currentItem, fetchItemById, loading } = useData();

  useEffect(() => {
    const controller = new AbortController();
    if (id) fetchItemById(id, controller.signal);
    return () => controller.abort();
  }, [id, fetchItemById]);

  if (loading) return <Loader />;

  if (!currentItem)
    return (
      <ItemNotFound
        message="The requested gear does not exist in our database."
        linkTo="/items"
        linkText="RETURN TO HANGAR"
      />
    );

  return (
    <main className="item-details-container">
      <div className="item-details-content">
        <ItemImage src={currentItem.image} alt={currentItem.name} />
        <ItemInfo item={currentItem} />
      </div>
    </main>
  );
}

export default ItemDetails;
