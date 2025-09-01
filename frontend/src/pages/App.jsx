import { Routes, Route } from "react-router-dom";
import { DataProvider } from "../state/data-context";
import Items from "./Items";
import ItemDetails from "./Item-details";
import NotFound from "./not-found";

function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
