import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { InventoryItem } from "../types/inventory";
import { inventoryApi } from "../api/inventory";

export interface Stats {
  totalItems: number;
  lowStockItems: number;
  categories: number;
}

export const useInventory = () => {
  const queryClient = useQueryClient();
  const {
    data: response,
    isLoading: isLoadingInventory,
    error: inventoryError,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: inventoryApi.getAll,
  });

  const inventory = response?.data || [];

  const addMutation = useMutation({
    mutationFn: inventoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<InventoryItem>;
    }) => inventoryApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: inventoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      inventoryApi.updateQuantity(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const stats = useMemo<Stats>(
    () => ({
      totalItems: Array.isArray(inventory)
        ? inventory.reduce(
            (sum: number, item: InventoryItem) => sum + item.quantity,
            0
          )
        : 0,
      lowStockItems: Array.isArray(inventory)
        ? inventory.filter(
            (item: InventoryItem) => item.quantity <= (item.minThreshold || 0)
          ).length
        : 0,
      categories: Array.isArray(inventory)
        ? [...new Set(inventory.map((item: InventoryItem) => item.category))]
            .length
        : 0,
    }),
    [inventory]
  );
  return {
    // Data and stats
    inventory,
    stats,

    // Global loading state for initial data fetch
    isLoading: isLoadingInventory,
    error: inventoryError,

    // Mutation handlers that return promises
    addItem: async (item: Omit<InventoryItem, "id">) => {
      await addMutation.mutateAsync(item);
    },
    updateItem: async (id: string, updates: Partial<InventoryItem>) => {
      await updateMutation.mutateAsync({ id, updates });
    },
    deleteItem: async (id: string) => {
      await deleteMutation.mutateAsync(id);
    },
    updateQuantity: async (id: string, quantity: number) => {
      if (quantity < 0) return;
      await updateQuantityMutation.mutateAsync({ id, quantity });
    },

    // Granular loading states for mutations
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isQuantityUpdating: updateQuantityMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Error states for mutations
    addError: addMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    quantityError: updateQuantityMutation.error,
  };
};
