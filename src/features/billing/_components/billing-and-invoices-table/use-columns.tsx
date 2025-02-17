import { Column } from '@/components/ui/data-table';
import { Invoice } from '@/types/invoice';
import { InvoiceDetails } from '@/features/billing/_components/invoice-details';

export interface UseColumnsArgs {
  onUploadProof: (invoice: Invoice) => void;
  setSelectedInvoice: (invoice: Invoice) => void;
}

export const useColumns = ({
  onUploadProof,
  setSelectedInvoice,
}: UseColumnsArgs): Column<Invoice>[] => {
  return [
    {
      header: () => 'Invoice Number',
      cell: ({ number }) => number,
    },
    {
      header: () => 'Date Issued',
      cell: ({ dateIssued }) => dateIssued,
    },
    {
      header: () => 'Due date',
      cell: ({ dueDate }) => dueDate,
    },
    {
      header: () => 'Due date',
      cell: ({ dueDate }) => dueDate,
    },
    {
      header: () => 'Due date',
      cell: ({ dueDate }) => dueDate,
    },
    {
      header: () => 'Actions',
      cell: (invoice) => (
        <InvoiceDetails
          data={invoice}
          onUploadProof={onUploadProof}
          setSelectedInvoice={setSelectedInvoice}
        />
      ),
    },
  ];
};
