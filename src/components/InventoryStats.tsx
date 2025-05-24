import React from "react";

interface StatsCardProps {
  value: number;
  label: string;
  isLoading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  isLoading = false,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    {isLoading ? (
      <>
        <div className="h-6 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-20 animate-pulse"></div>
      </>
    ) : (
      <>
        <div className="text-xl font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </>
    )}
  </div>
);

interface InventoryStatsProps {
  totalItems: number;
  lowStockItems: number;
  categories: number;
  isLoading?: boolean;
}

const InventoryStats: React.FC<InventoryStatsProps> = ({
  totalItems,
  lowStockItems,
  categories,
  isLoading = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard value={totalItems} label="Total Items" isLoading={isLoading} />
      <StatsCard
        value={lowStockItems}
        label="Low Stock Items"
        isLoading={isLoading}
      />
      <StatsCard value={categories} label="Categories" isLoading={isLoading} />
    </div>
  );
};

export default InventoryStats;
