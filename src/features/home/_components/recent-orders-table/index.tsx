import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { RecentOrder } from '@/types/order';
import { RECENT_ORDERS_COLUMNS } from '@/features/home/_components/recent-orders-table/constants';

export interface RecentOrdersTableProps {
  title: string;
  data: RecentOrder[];
}

export const RecentOrdersTable = ({ title, data }: RecentOrdersTableProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable data={data} columns={RECENT_ORDERS_COLUMNS} />
      </CardContent>
    </Card>
  );
};
