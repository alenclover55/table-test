import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import PricePlansPage from "./pages/PricePlansPage";
import PagesPage from "./pages/PagesPage";
import { pages, pricePlans, products } from "./data";

const App: React.FC = () => {
  return (
    <div className="p-5">
      <Router>
        <nav className="flex items-center gap-3">
          <Link
            className="p-3 bg-amber-700 text-white rounded-lg hover:bg-amber-500 transition-colors"
            to="/products"
          >
            Products
          </Link>
          <Link
            className="p-3 bg-amber-700 text-white rounded-lg hover:bg-amber-500 transition-colors"
            to="/price-plans"
          >
            Price Plans
          </Link>
          <Link
            className="p-3 bg-amber-700 text-white rounded-lg hover:bg-amber-500 transition-colors"
            to="/pages"
          >
            Pages
          </Link>
        </nav>

        <Routes>
          <Route path="/products" element={<ProductsPage data={products} />} />
          <Route
            path="/price-plans"
            element={<PricePlansPage data={pricePlans} />}
          />
          <Route path="/pages" element={<PagesPage data={pages} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
