export interface InventoryItem {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  minThreshold: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export type NewInventoryItem = Omit<
  InventoryItem,
  "_id" | "createdAt" | "updatedAt" | "__v"
>;

export interface FormErrors {
  name?: string;
  quantity?: string;
  category?: string;
  minThreshold?: string;
  submit?: string;
}
