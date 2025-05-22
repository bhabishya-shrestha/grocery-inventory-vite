import React, { useState, useCallback, useMemo } from "react";
import BarcodeScanner from "./BarcodeScanner";
import InventoryList from "./InventoryList";
import { MdAdd, MdSync, MdQrCodeScanner, MdClose } from "react-icons/md";
import Notification from "./Notification";
import type { NotificationType } from "./Notification";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  category?: string;
  minThreshold?: number;
}

interface FormErrors {
  name?: string;
  quantity?: string;
  category?: string;
  minThreshold?: string;
}

// HomePage component: Main dashboard for the grocery inventory app.
// - Displays current inventory (via InventoryList)
// - Provides a button to launch the BarcodeScanner
// - Handles toggling the scanner UI
const HomePage: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
    isVisible: boolean;
  }>({
    type: "success",
    message: "",
    isVisible: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Apples",
      quantity: 10,
      category: "Fruits",
      minThreshold: 5,
    },
    {
      id: "2",
      name: "Bananas",
      quantity: 5,
      category: "Fruits",
      minThreshold: 3,
    },
    { id: "3", name: "Milk", quantity: 2, category: "Dairy", minThreshold: 2 },
    {
      id: "4",
      name: "Bread",
      quantity: 4,
      category: "Bakery",
      minThreshold: 2,
    },
    { id: "5", name: "Eggs", quantity: 12, category: "Dairy", minThreshold: 6 },
  ]);

  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    quantity: 0,
    category: "",
    minThreshold: 0,
  });

  const showNotification = useCallback(
    (type: NotificationType, message: string) => {
      setNotification({ type, message, isVisible: true });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, isVisible: false }));
      }, 3000);
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};

    if (!newItem.name?.trim()) {
      errors.name = "Name is required";
    }

    if (typeof newItem.quantity !== "number" || newItem.quantity < 0) {
      errors.quantity = "Please enter a valid quantity";
    }

    if (
      newItem.minThreshold !== undefined &&
      (typeof newItem.minThreshold !== "number" || newItem.minThreshold < 0)
    ) {
      errors.minThreshold = "Please enter a valid minimum threshold";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [newItem]);

  const handleAddItem = useCallback(async () => {
    if (!validateForm()) {
      showNotification("error", "Please fix the form errors");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setInventory((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newItem.name!,
          quantity: newItem.quantity!,
          category: newItem.category,
          minThreshold: newItem.minThreshold,
        },
      ]);

      setNewItem({ name: "", quantity: 0, category: "", minThreshold: 0 });
      setShowAddModal(false);
      showNotification("success", "Item added successfully");
    } catch {
      showNotification("error", "Failed to add item");
    } finally {
      setIsLoading(false);
    }
  }, [newItem, validateForm, showNotification]);

  const handleDeleteItem = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setInventory((prev) => prev.filter((item) => item.id !== id));
        showNotification("success", "Item deleted successfully");
      } catch {
        showNotification("error", "Failed to delete item");
      } finally {
        setIsLoading(false);
      }
    },
    [showNotification]
  );

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification("success", "Inventory refreshed");
    } catch {
      showNotification("error", "Failed to refresh inventory");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  // Stats calculations with animations
  const [stats, setStats] = useState({
    totalItems: 0,
    lowStockItems: 0,
    categories: 0,
  });

  // Update stats with animation
  React.useEffect(() => {
    const newStats = {
      totalItems: inventory.reduce((sum, item) => sum + item.quantity, 0),
      lowStockItems: inventory.filter(
        (item) => item.quantity <= (item.minThreshold || 0)
      ).length,
      categories: [...new Set(inventory.map((item) => item.category))].length,
    };
    setStats(newStats);
  }, [inventory]);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  }, []);

  // Filter inventory consistently
  const filteredInventory = useMemo(
    () =>
      inventory.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [inventory, searchQuery]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xl font-semibold text-gray-900">
                {stats.totalItems}
              </div>
              <div className="text-sm text-gray-500">Total Items</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xl font-semibold text-gray-900">
                {stats.lowStockItems}
              </div>
              <div className="text-sm text-gray-500">Low Stock Items</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-xl font-semibold text-gray-900">
                {stats.categories}
              </div>
              <div className="text-sm text-gray-500">Categories</div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
              >
                <MdAdd className="w-5 h-5" />
                Add Item
              </button>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
              >
                <MdSync
                  className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
              <button
                onClick={() => setShowScanner(true)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <MdQrCodeScanner className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Inventory List */}
          <InventoryList
            inventory={filteredInventory}
            onDelete={handleDeleteItem}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Item</h2>
              <button
                onClick={() => setShowAddModal(false)}
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
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, name: e.target.value }))
                  }
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
                    setNewItem((prev) => ({
                      ...prev,
                      quantity: Math.max(0, parseInt(e.target.value) || 0),
                    }))
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.quantity ? "border-red-300" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                />
                {formErrors.quantity && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.quantity}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.category ? "border-red-300" : "border-gray-300"
                  } shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                />
                {formErrors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.category}
                  </p>
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
                    setNewItem((prev) => ({
                      ...prev,
                      minThreshold: Math.max(0, parseInt(e.target.value) || 0),
                    }))
                  }
                  className={`mt-1 block w-full rounded-md border ${
                    formErrors.minThreshold
                      ? "border-red-300"
                      : "border-gray-300"
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
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Adding..." : "Add Item"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScanner && <BarcodeScanner onClose={() => setShowScanner(false)} />}
    </div>
  );
};

export default HomePage;
