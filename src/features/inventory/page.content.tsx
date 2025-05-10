'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CATEGORY_SELECT_OPTIONS, WAREHOUSE_SELECT_OPTIONS } from '@/features/inventory/_mocks';
import { Select } from '@/features/inventory/_components/select';
import { InventoryTable } from '@/features/inventory/_components/inventory-table';
import { useInventory } from '@/features/inventory/_hooks/use-inventory';

export function InventoryPageContent() {
  const {
    filter,
    warehouse,
    category,
    selectedItems,
    reorderItem,
    thresholdItem,
    newThreshold,
    filteredInventory,
    setFilter,
    setReorderItem,
    setCategory,
    setThresholdItem,
    handleCheckboxChange,
    handleThresholdSubmit,
    handleThresholdChange,
    handleBulkReorder,
    setWarehouse,
    setSelectedItems,
  } = useInventory();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Inventory Management</h1>

      <div className="flex space-x-4">
        <Input
          placeholder="Search by SKU or Product Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />

        <Select
          placeholder="Select Warehouse"
          value={warehouse}
          onValueChange={setWarehouse}
          options={WAREHOUSE_SELECT_OPTIONS}
        />

        <Select
          placeholder="Select Warehouse"
          value={category}
          onValueChange={setCategory}
          options={CATEGORY_SELECT_OPTIONS}
        />
      </div>

      <InventoryTable
        data={filteredInventory}
        reorderItem={reorderItem}
        setReorderItem={setReorderItem}
        thresholdItem={thresholdItem}
        setThresholdItem={setThresholdItem}
        newThreshold={newThreshold}
        handleThresholdChange={handleThresholdChange}
        handleThresholdSubmit={handleThresholdSubmit}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        handleCheckboxChange={handleCheckboxChange}
      />

      {selectedItems.length > 0 && (
        <div className="flex justify-end">
          <Button onClick={handleBulkReorder}>Reorder Selected ({selectedItems.length})</Button>
        </div>
      )}
    </div>
  );
}
