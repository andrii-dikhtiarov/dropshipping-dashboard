import { Column } from '@/components/ui/data-table';
import { InvoiceItem } from '@/types/invoice';

export const INVOICE_DETAILS_COLUMNS: Column<InvoiceItem>[] = [
  {
    header: () => 'SKU',
    cell: ({ sku }) => sku,
    width: 100,
  },
  {
    header: () => 'Name',
    cell: ({ name }) => name,
    width: 100,
  },
  {
    header: () => 'Quantity',
    cell: ({ quantity }) => quantity,
    width: 100,
  },
  {
    header: () => 'Price',
    cell: ({ price }) => price.toFixed(2),
    width: 100,
  },
  {
    header: () => 'Total',
    cell: ({ quantity, price }) => (quantity * price).toFixed(2),
    width: 100,
  },
];
