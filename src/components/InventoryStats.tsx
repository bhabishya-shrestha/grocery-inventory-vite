import React from "react";

interface StatsCardProps {
  value: number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ value, label }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="text-xl font-semibold text-gray-900">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

interface InventoryStatsProps {
  totalItems: number;
  lowStockItems: number;
  categories: number;
}

export const InventoryStats: React.FC<InventoryStatsProps> = ({
  totalItems,
  lowStockItems,
  categories,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard value={totalItems} label="Total Items" />
      <StatsCard value={lowStockItems} label="Low Stock Items" />
      <StatsCard value={categories} label="Categories" />
    </div>
  );
};

export default InventoryStats;
