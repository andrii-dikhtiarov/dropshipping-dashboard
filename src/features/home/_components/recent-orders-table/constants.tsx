import { Column } from '@/components/ui/data-table';
import { RecentOrder } from '@/types/order';

export const RECENT_ORDERS_COLUMNS: Column<RecentOrder>[] = [
  {
    header: () => 'Order ID',
    cell: ({ orderId }) => orderId,
  },
  {
    header: () => 'Date',
    cell: ({ date }) => date,
  },
  {
    header: () => 'Status',
    cell: ({ status }) => status,
  },
];
