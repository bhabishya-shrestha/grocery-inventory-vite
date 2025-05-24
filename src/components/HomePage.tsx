import React, { useState } from "react";
import { MdAdd, MdQrCodeScanner, MdClose } from "react-icons/md";
import BarcodeScanner from "./BarcodeScanner";
import InventoryList from "./InventoryList";
import InventoryStats from "./InventoryStats";
import AddItemModal from "./AddItemModal";
import { useInventory } from "../hooks/useInventory";
import { useNotification } from "../hooks/useNotification";
import type { InventoryItem } from "../types/inventory";

// HomePage component: Main dashboard for the grocery inventory app.
const HomePage: React.FC = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    inventory,
    stats,
    isLoading,
    error,
    addItem,
    deleteItem,
    updateQuantity,
    isAdding,
    isUpdating,
    isDeleting,
  } = useInventory();

  const { notification, showNotification } = useNotification();

  const filteredInventory = React.useMemo(() => {
    if (!inventory) return [];
    return inventory.filter(
      (item: InventoryItem) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [inventory, searchQuery]);

  const handleAddItem = async (item: Omit<InventoryItem, "id">) => {
    try {
      await addItem(item);
      setShowAddModal(false);
      showNotification("Item added successfully", "success");
    } catch (err) {
      showNotification("Failed to add item", "error");
      console.error(err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      showNotification("Item deleted successfully", "success");
    } catch (err) {
      showNotification("Failed to delete item", "error");
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      if (quantity >= 0) {
        await updateQuantity(id, quantity);
      }
    } catch (err) {
      showNotification("Failed to update quantity", "error");
      console.error(err);
    }
  };

  const handleBarcodeScanned = (barcode: string) => {
    // TODO: Implement barcode lookup
    console.log("Scanned barcode:", barcode);
    setShowScanner(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <p className="text-red-700">Error loading inventory</p>
          <p className="text-sm text-red-600">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Inventory Management
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowScanner(true)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <MdQrCodeScanner className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <MdAdd className="w-5 h-5 mr-1" />
                Add Item
              </button>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Inventory Stats */}
          <div className="lg:col-span-1">
            <InventoryStats
              totalItems={stats.totalItems}
              lowStockItems={stats.lowStockItems}
              categories={stats.categories}
              isLoading={isLoading}
            />
          </div>

          {/* Inventory List */}
          <div className="lg:col-span-3">
            <InventoryList
              inventory={filteredInventory}
              onDelete={handleDeleteItem}
              onUpdateQuantity={handleUpdateQuantity}
              isLoading={isLoading}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          </div>
        </div>
      </main>

      {/* Add Item Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddItem}
          isLoading={isAdding}
        />
      )}

      {/* Barcode Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Scan Barcode</h3>
              <button
                onClick={() => setShowScanner(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <BarcodeScanner
                onScan={handleBarcodeScanned}
                onClose={() => setShowScanner(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
