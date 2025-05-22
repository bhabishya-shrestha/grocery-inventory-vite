import React from "react";
import { MdClose } from "react-icons/md";
import type { InventoryItem, FormErrors } from "../types/inventory";

interface AddItemModalProps {
  isOpen: boolean;
  isLoading: boolean;
  newItem: Partial<InventoryItem>;
  formErrors: FormErrors;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (updates: Partial<InventoryItem>) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  isLoading,
  newItem,
  formErrors,
  onClose,
  onSubmit,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.name ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              min="0"
              value={newItem.quantity}
              onChange={(e) =>
                onChange({
                  quantity: Math.max(0, parseInt(e.target.value) || 0),
                })
              }
              className={`mt-1 block w-full rounded-md border ${
                formErrors.quantity ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            />
            {formErrors.quantity && (
              <p className="mt-1 text-sm text-red-600">{formErrors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={newItem.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className={`mt-1 block w-full rounded-md border ${
                formErrors.category ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            />
            {formErrors.category && (
              <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Threshold
            </label>
            <input
              type="number"
              min="0"
              value={newItem.minThreshold}
              onChange={(e) =>
                onChange({
                  minThreshold: Math.max(0, parseInt(e.target.value) || 0),
                })
              }
              className={`mt-1 block w-full rounded-md border ${
                formErrors.minThreshold ? "border-red-300" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            />
            {formErrors.minThreshold && (
              <p className="mt-1 text-sm text-red-600">
                {formErrors.minThreshold}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
