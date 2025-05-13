import React, { useState } from "react";

import { PricePlan, TableColumn } from "../types";
import { EditModal, GenericTable } from "../components";

const pricePlanColumns: TableColumn<PricePlan>[] = [
  { key: "id", header: "ID" },
  { key: "description", header: "Description", editable: true },
  {
    key: "active",
    header: "Active",
    render: (value) => (value ? "Yes" : "No"),
  },
  { key: "createdAt", header: "Created At" },
  { key: "removedAt", header: "Removed At" },
];

const PricePlansPage: React.FC<{ data: PricePlan[] }> = ({ data }) => {
  const [pricePlans, setPricePlans] = useState<PricePlan[]>(data);
  const [editingPricePlan, setEditingPricePlan] = useState<PricePlan | null>(
    null
  );

  const handleSave = (updatedProduct: PricePlan) => {
    setPricePlans(
      pricePlans.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingPricePlan(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-3">Price Plans</h1>
      <GenericTable
        data={pricePlans}
        columns={pricePlanColumns}
        filterKey="description"
        onEdit={setEditingPricePlan}
      />
      <EditModal
        item={editingPricePlan}
        columns={pricePlanColumns.filter((c) => c.editable)}
        onSave={handleSave}
        onClose={() => setEditingPricePlan(null)}
      />
    </div>
  );
};

export default PricePlansPage;
