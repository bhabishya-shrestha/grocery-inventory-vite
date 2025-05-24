import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import type { InventoryItem } from "../types/inventory";

interface AddItemModalProps {
  onClose: () => void;
  onSubmit: (item: Omit<InventoryItem, "id">) => Promise<void>;
  isLoading?: boolean;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Omit<InventoryItem, "id">>({
    name: "",
    quantity: 0,
    category: "",
    minThreshold: 5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.quantity < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    }

    if (!formData.category?.trim()) {
      newErrors.category = "Category is required";
    }

    if (formData.minThreshold !== undefined && formData.minThreshold < 0) {
      newErrors.minThreshold = "Minimum threshold cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Ensure required fields are present and use default values where needed
        const itemToSubmit = {
          name: formData.name.trim(),
          quantity: formData.quantity,
          category: formData.category?.trim() || "",
          minThreshold: formData.minThreshold ?? 5, // Default minimum threshold of 5
        };
        await onSubmit(itemToSubmit);
        onClose();
      } catch (err) {
        const error = err as Error;
        console.error("Failed to add item:", error);
        // Set a user-friendly error message
        setErrors((prev) => ({
          ...prev,
          submit: error.message || "Failed to add item. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500`}
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                ${
                  errors.category ? "border-red-300" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500`}
              disabled={isLoading}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  quantity: parseInt(e.target.value) || 0,
                }))
              }
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                ${
                  errors.quantity ? "border-red-300" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500`}
              min="0"
              disabled={isLoading}
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="minThreshold"
              className="block text-sm font-medium text-gray-700"
            >
              Minimum Threshold
            </label>
            <input
              type="number"
              id="minThreshold"
              value={formData.minThreshold}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  minThreshold: parseInt(e.target.value) || 0,
                }))
              }
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                ${
                  errors.minThreshold ? "border-red-300" : "border-gray-300"
                } focus:border-indigo-500 focus:ring-indigo-500`}
              min="0"
              disabled={isLoading}
            />
            {errors.minThreshold && (
              <p className="mt-1 text-sm text-red-600">{errors.minThreshold}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
