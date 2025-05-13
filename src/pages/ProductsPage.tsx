import React, { useState } from "react";

import { Product, TableColumn } from "../types";
import { EditModal, GenericTable } from "../components";

const productColumns: TableColumn<Product>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name", editable: true },
  {
    key: "options",
    header: "Options",
    render: (value) => `${value.size} / ${value.amount}`,
  },
  {
    key: "active",
    header: "Active",
    render: (value) => (value ? "Yes" : "No"),
  },
  { key: "createdAt", header: "Created At" },
];

const ProductsPage: React.FC<{ data: Product[] }> = ({ data }) => {
  const [products, setProducts] = useState<Product[]>(data);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSave = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-3">Products</h1>
      <GenericTable
        data={products}
        columns={productColumns}
        filterKey="name"
        onEdit={setEditingProduct}
      />
      <EditModal
        item={editingProduct}
        columns={productColumns.filter((c) => c.editable)}
        onSave={handleSave}
        onClose={() => setEditingProduct(null)}
      />
    </div>
  );
};

export default ProductsPage;
