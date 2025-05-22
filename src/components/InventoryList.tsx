import React from "react";
import { MdDeleteOutline, MdAdd, MdRemove } from "react-icons/md";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  minThreshold?: number;
}

interface InventoryListProps {
  inventory: InventoryItem[];
  onDelete: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

// InventoryList component: Displays a list of inventory items in a modern, fluid card style.
const InventoryList: React.FC<InventoryListProps> = ({
  inventory,
  onDelete,
  onUpdateQuantity,
}) => {
  return (
    <div className="divide-y divide-gray-200">
      <div className="px-6 py-4 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Current Inventory
        </h2>
        <span className="text-sm text-gray-500">{inventory.length} items</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
              >
                Item
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {item.category || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-start gap-1.5">
                    <button
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <MdRemove className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-900 font-mono font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <MdAdd className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.quantity <= (item.minThreshold || 0)
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : "bg-green-50 text-green-700 border border-green-100"
                    }`}
                  >
                    {item.quantity <= (item.minThreshold || 0)
                      ? "Low Stock"
                      : "In Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <MdDeleteOutline className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inventory.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm">No items in inventory</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryList;
