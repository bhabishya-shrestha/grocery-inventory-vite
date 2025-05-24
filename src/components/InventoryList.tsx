import React from "react";
import { MdDeleteOutline, MdAdd, MdRemove } from "react-icons/md";
import type { InventoryItem } from "../types/inventory";

interface InventoryListProps {
  inventory: InventoryItem[];
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  isLoading?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

// InventoryList component: Displays a list of inventory items in a modern, fluid card style.
const InventoryList: React.FC<InventoryListProps> = ({
  inventory,
  onDelete,
  onUpdateQuantity,
  isLoading = false,
  isUpdating = false,
  isDeleting = false,
}) => {
  const isDisabled = isLoading || isUpdating || isDeleting;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Current Inventory
        </h2>
        <span className="text-sm text-gray-500">{inventory.length} items</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr
                key={item._id}
                className={`${
                  item.quantity <= (item.minThreshold || 0)
                    ? "bg-red-50"
                    : "hover:bg-gray-50"
                } transition-colors duration-150 ease-in-out`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.category || "Uncategorized"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {item.category || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item._id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      disabled={isDisabled || item.quantity <= 0}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MdRemove className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item._id, item.quantity + 1)
                      }
                      disabled={isDisabled}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MdAdd className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.quantity <= (item.minThreshold || 0)
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.quantity <= (item.minThreshold || 0)
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(item._id)}
                    disabled={isDisabled}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MdDeleteOutline className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
