import React, { useState, useEffect } from "react";
import { EditModalProps, DataType } from "../types";

export const EditModal = <T extends DataType>({
  item,
  columns,
  onSave,
  onClose,
}: EditModalProps<T>) => {
  const [editedItem, setEditedItem] = useState<T | null>(null);

  useEffect(() => {
    setEditedItem(item ? { ...item } : null);
  }, [item]);

  if (!editedItem) return null;

  const handleChange = (key: keyof T, value: string) => {
    setEditedItem((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedItem);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center bg-black/50 w-screen h-screen">
      <div className="bg-white p-5 rounded-xl w-[400px]">
        <h2 className="text-xl font-bold">Edit Item</h2>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((column) => column.editable)
            .map((column) => (
              <div key={column.key as string} className="flex flex-col gap-1">
                <label>{column.header}</label>
                <input
                  type="text"
                  className="border h-10 px-2"
                  value={String(editedItem[column.key])}
                  onChange={(e) => handleChange(column.key, e.target.value)}
                />
              </div>
            ))}
          <div className="flex gap-2 mt-3">
            <button
              className="p-2 bg-amber-700 text-white rounded-lg hover:bg-amber-500 transition-colors cursor-pointer"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="p-2 bg-amber-700 text-white rounded-lg hover:bg-amber-500 transition-colors cursor-pointer"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
