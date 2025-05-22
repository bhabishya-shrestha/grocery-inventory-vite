export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  minThreshold?: number;
}

export interface FormErrors {
  name?: string;
  quantity?: string;
  category?: string;
  minThreshold?: string;
}
