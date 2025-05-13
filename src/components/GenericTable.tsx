import { useState } from "react";
import { TableProps, DataType } from "../types";

export const GenericTable = <T extends DataType>({
  data,
  columns,
  filterKey,
  onEdit,
}: TableProps<T>) => {
  const [filter, setFilter] = useState<string>("");
  const isDateString = (value: unknown): boolean => {
    if (typeof value !== "string") return false;
    return !isNaN(Date.parse(value));
  };

  const formatValue = (value: unknown): React.ReactNode => {
    if (isDateString(value)) {
      const date = new Date(value as string);
      return new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }
    return String(value);
  };
  function filterByKey<T>(data: T[], filter: string, key: string): T[] {
    const filterLower = filter.toLowerCase();

    return data.filter((item) => {
      const value = item[key as keyof T];
      return (
        typeof value === "string" && value.toLowerCase().includes(filterLower)
      );
    });
  }
  const filteredByUsername = filterByKey(data, filter, filterKey);
  return (
    <div className="flex flex-col w-full">
      <div className="filter-container self-end mb-3">
        <input
          className="border h-10 px-2 rounded-md"
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filteredByUsername.length !== 0 ? (
        <table className="data-table bg-amber-50 max-w-screen w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  className="border px-4 py-2 break-words max-w-[200px]"
                  key={column.key as string}
                >
                  {column.header}
                </th>
              ))}
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredByUsername.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td
                    className="border px-4 py-2 break-words max-w-[200px]"
                    key={column.key as string}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : formatValue(item[column.key])}
                  </td>
                ))}
                <td className="border px-4 py-2">
                  <button
                    className="p-2 bg-amber-700 text-white rounded-lg hover:bg-amber-500 transition-colors cursor-pointer"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Записей не найдено</p>
      )}
    </div>
  );
};
