export interface Product {
  id: number;
  name: string;
  options: {
    size: string;
    amount: number;
  };
  active: boolean;
  createdAt: string;
}

export interface PricePlan {
  id: number;
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
}

export interface Page {
  id: number;
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
}

export type DataType = Product | PricePlan | Page;

export type DataKey = keyof DataType;

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  editable?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onEdit: (item: T) => void;
}

export interface EditModalProps<T> {
  item: T | null;
  columns: TableColumn<T>[];
  onSave: (updatedItem: T) => void;
  onClose: () => void;
}
