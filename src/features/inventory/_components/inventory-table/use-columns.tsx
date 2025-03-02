import { Column } from '@/components/ui/data-table';
import { Inventory } from '@/types/inventory';
import { Actions } from '@/features/inventory/_components/inventory-table/actions';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';

export interface UseColumnsArgs {
  reorderItem: Inventory | null;
  setReorderItem: (item: Inventory) => void;
  thresholdItem: Inventory | null;
  setThresholdItem: (thresholdItem: Inventory) => void;
  newThreshold: number | string;
  handleThresholdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleThresholdSubmit: () => void;
  selectedItems: number[];
  setSelectedItems: (item: number[]) => void;
  filteredInventory: Inventory[];
  handleCheckboxChange: (id: number) => void;
}

export const useColumns = ({
  reorderItem,
  thresholdItem,
  newThreshold,
  handleThresholdChange,
  setThresholdItem,
  setReorderItem,
  handleThresholdSubmit,
  selectedItems,
  setSelectedItems,
  filteredInventory,
  handleCheckboxChange,
}: UseColumnsArgs): Column<Inventory>[] => {
  return [
    {
      header: () => (
        <Checkbox
          checked={selectedItems.length === filteredInventory.length}
          onCheckedChange={() =>
            setSelectedItems(
              selectedItems.length === filteredInventory.length
                ? []
                : filteredInventory.map((item) => item.id),
            )
          }
        />
      ),
      cell: ({ id }) => (
        <Checkbox
          checked={selectedItems.includes(id)}
          onCheckedChange={() => handleCheckboxChange(id)}
        />
      ),
      width: 40,
    },
    {
      header: () => 'SKU',
      cell: ({ sku }) => sku,
      width: 70,
    },
    {
      header: () => 'Product Name',
      cell: ({ name }) => name,
      width: 100,
    },
    {
      header: () => 'Image',
      cell: ({ image, name }) => (
        <Image src={image || '/placeholder.svg'} alt={name} width={50} height={50} />
      ),
      width: 80,
    },
    {
      header: () => 'Warehouse',
      cell: ({ warehouse }) => warehouse,
      width: 90,
    },
    {
      header: () => 'Available Stock',
      cell: ({ stock }) => stock,
      width: 110,
    },
    {
      header: () => 'Low Stock Threshold',
      cell: ({ threshold }) => threshold,
      width: 135,
    },
    {
      header: () => 'Estimated Runout',
      cell: ({ runoutDays }) => runoutDays,
      width: 105,
    },
    {
      header: () => 'Actions',
      cell: (invoice) => (
        <Actions
          item={invoice}
          reorderItem={reorderItem}
          thresholdItem={thresholdItem}
          newThreshold={newThreshold}
          handleThresholdSubmit={handleThresholdSubmit}
          handleThresholdChange={handleThresholdChange}
          setReorderItem={setReorderItem}
          setThresholdItem={setThresholdItem}
        />
      ),
    },
  ];
};
