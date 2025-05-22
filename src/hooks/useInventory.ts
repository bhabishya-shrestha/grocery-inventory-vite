import { useState, useCallback, useEffect } from "react";
import type { InventoryItem } from "../types/inventory";

interface Stats {
  totalItems: number;
  lowStockItems: number;
  categories: number;
}

export const useInventory = (initialItems: InventoryItem[] = []) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialItems);
  const [stats, setStats] = useState<Stats>({
    totalItems: 0,
    lowStockItems: 0,
    categories: 0,
  });

  useEffect(() => {
    const newStats = {
      totalItems: inventory.reduce((sum, item) => sum + item.quantity, 0),
      lowStockItems: inventory.filter(
        (item) => item.quantity <= (item.minThreshold || 0)
      ).length,
      categories: [...new Set(inventory.map((item) => item.category))].length,
    };
    setStats(newStats);
  }, [inventory]);

  const addItem = useCallback((item: Omit<InventoryItem, "id">) => {
    setInventory((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  }, []);

  const deleteItem = useCallback((id: string) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  }, []);

  return {
    inventory,
    stats,
    addItem,
    deleteItem,
    updateQuantity,
  };
};
