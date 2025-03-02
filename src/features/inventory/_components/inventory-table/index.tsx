import { DataTable } from '@/components/ui/data-table';
import { Inventory } from '@/types/inventory';
import { useColumns } from '@/features/inventory/_components/inventory-table/use-columns';
import { useCallback } from 'react';

export interface RecentOrdersTableProps {
  data: Inventory[];
  reorderItem: Inventory | null;
  setReorderItem: (item: Inventory) => void;
  thresholdItem: Inventory | null;
  setThresholdItem: (thresholdItem: Inventory) => void;
  newThreshold: number | string;
  handleThresholdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleThresholdSubmit: () => void;
  selectedItems: number[];
  setSelectedItems: (item: number[]) => void;
  handleCheckboxChange: (id: number) => void;
}

export const InventoryTable = ({
  data,
  reorderItem,
  thresholdItem,
  newThreshold,
  handleThresholdChange,
  setThresholdItem,
  setReorderItem,
  handleThresholdSubmit,
  selectedItems,
  setSelectedItems,
  handleCheckboxChange,
}: RecentOrdersTableProps) => {
  const columns = useColumns({
    reorderItem,
    thresholdItem,
    newThreshold,
    handleThresholdChange,
    setThresholdItem,
    setReorderItem,
    handleThresholdSubmit,
    selectedItems,
    setSelectedItems,
    handleCheckboxChange,
    filteredInventory: data,
  });

  const getTBodyRowClassName = useCallback(
    (item?: Inventory) => (item && item.stock < item.threshold ? 'bg-red-100' : ''),
    [],
  );

  return <DataTable data={data} columns={columns} getTBodyRowClassName={getTBodyRowClassName} />;
};
