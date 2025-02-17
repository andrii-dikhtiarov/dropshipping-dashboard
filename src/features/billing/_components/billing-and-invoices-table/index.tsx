import { DataTable } from '@/components/ui/data-table';
import { Invoice } from '@/types/invoice';
import { useCallback } from 'react';
import { useColumns } from '@/features/billing/_components/billing-and-invoices-table/use-columns';

export interface RecentOrdersTableProps {
  data: Invoice[];
  getIsInvoiceNearingDueDate: (invoice: Invoice) => boolean;
  onUploadProof: (invoice: Invoice) => void;
  setSelectedInvoice: (invoice: Invoice) => void;
}

export const BillingAndInvoicesTable = ({
  data,
  getIsInvoiceNearingDueDate,
  onUploadProof,
  setSelectedInvoice,
}: RecentOrdersTableProps) => {
  const columns = useColumns({ onUploadProof, setSelectedInvoice });

  const getTBodyRowClassName = useCallback(
    (invoice?: Invoice) =>
      invoice && getIsInvoiceNearingDueDate(invoice) && invoice.status === 'Unpaid'
        ? 'bg-red-100'
        : '',
    [],
  );

  return <DataTable data={data} columns={columns} getTBodyRowClassName={getTBodyRowClassName} />;
};
