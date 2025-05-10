import { DataTable } from '@/components/ui/data-table';
import { InvoiceItem } from '@/types/invoice';
import { useMemo } from 'react';
import { INVOICE_DETAILS_COLUMNS } from '@/features/billing/_components/invoice-details/invoice-details-table/constants';

export interface InvoiceDetailsTableProps {
  title: string;
  data: InvoiceItem[];
}

export const InvoiceDetailsTable = ({ data }: InvoiceDetailsTableProps) => {
  const preparedData = useMemo(() => data.map((item, index) => ({ ...item, id: index + 1 })), []);
  return <DataTable data={preparedData} columns={INVOICE_DETAILS_COLUMNS} />;
};
