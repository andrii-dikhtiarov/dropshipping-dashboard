import { Invoice } from '@/types/invoice';
import { InvoiceDetailsTable } from '@/features/billing/_components/invoice-details/invoice-details-table';
import { InvoiceInfo } from '@/features/billing/_components/invoice-details/invoice-info';
import { InvoiceActions } from '@/features/billing/_components/invoice-details/invoice-actions';
import { InvoiceDialog } from '@/features/billing/_components/invoice-details/invoice-dialog';

export interface InvoiceDetailsProps {
  data: Invoice;
  onUploadProof: (invoice: Invoice) => void;
  setSelectedInvoice: (invoice: Invoice) => void;
}

export const InvoiceDetails = ({
  data,
  onUploadProof,
  setSelectedInvoice,
}: InvoiceDetailsProps) => {
  return (
    <InvoiceDialog data={data} setSelectedInvoice={setSelectedInvoice}>
      <div className="py-4">
        <InvoiceInfo data={data} />
        <h3 className="mb-2 mt-4 font-semibold">Line Items:</h3>
        <InvoiceDetailsTable title="Invoice Details" data={data.items} />
        <InvoiceActions data={data} onUploadProof={onUploadProof} />
      </div>
    </InvoiceDialog>
  );
};
