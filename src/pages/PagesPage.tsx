import React, { useState } from "react";
import { Page, TableColumn } from "../types";
import { EditModal, GenericTable } from "../components";

const pageColumns: TableColumn<Page>[] = [
  { key: "id", header: "ID" },
  { key: "title", header: "Title", editable: true },
  {
    key: "active",
    header: "Active",
    render: (value) => (value ? "Yes" : "No"),
  },
  { key: "updatedAt", header: "Updated At" },
  { key: "publishedAt", header: "Published At" },
];

const PagesPage: React.FC<{ data: Page[] }> = ({ data }) => {
  const [pages, setPages] = useState<Page[]>(data);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  const handleSave = (updatedProduct: Page) => {
    setPages(
      pages.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingPage(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-3">Pages</h1>
      <GenericTable
        data={pages}
        columns={pageColumns}
        onEdit={setEditingPage}
      />
      <EditModal
        item={editingPage}
        columns={pageColumns.filter((c) => c.editable)}
        onSave={handleSave}
        onClose={() => setEditingPage(null)}
      />
    </div>
  );
};

export default PagesPage;
