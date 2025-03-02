import { useState } from 'react';
import { INVENTORY_DATA } from '@/features/inventory/_mocks';
import { toast } from '@/components/ui/use-toast';

export const useInventory = () => {
  const [filter, setFilter] = useState('');
  const [warehouse, setWarehouse] = useState('All');
  const [category, setCategory] = useState('All');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [reorderItem, setReorderItem] = useState<(typeof INVENTORY_DATA)[0] | null>(null);
  const [thresholdItem, setThresholdItem] = useState<(typeof INVENTORY_DATA)[0] | null>(null);
  const [newThreshold, setNewThreshold] = useState<number | ''>('');
  const [inventory, setInventory] = useState(INVENTORY_DATA);

  const filteredInventory = inventory.filter(
    (item) =>
      (item.sku.toLowerCase().includes(filter.toLowerCase()) ||
        item.name.toLowerCase().includes(filter.toLowerCase())) &&
      (warehouse === 'All' || item.warehouse === warehouse) &&
      (category === 'All' || item.sku.startsWith(category)),
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleBulkReorder = () => {
    console.log('Bulk reorder for items:', selectedItems);
    // Here you would typically send this data to your backend
    toast({
      title: 'Bulk Reorder Initiated',
      description: `Reorder request sent for ${selectedItems.length} items.`,
    });
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewThreshold(value === '' ? '' : Number(value));
  };

  const handleThresholdSubmit = () => {
    if (thresholdItem && newThreshold !== '') {
      setInventory((prev) =>
        prev.map((item) =>
          item.id === thresholdItem.id ? { ...item, threshold: Number(newThreshold) } : item,
        ),
      );
      toast({
        title: 'Threshold Updated',
        description: `Low stock threshold for ${thresholdItem.name} updated to ${newThreshold}.`,
      });
      setThresholdItem(null);
      setNewThreshold('');
    }
  };

  return {
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
    setNewThreshold,
    handleThresholdSubmit,
    handleThresholdChange,
    handleBulkReorder,
    setWarehouse,
    setSelectedItems,
  };
};
