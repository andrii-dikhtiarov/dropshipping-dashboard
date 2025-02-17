import { Invoice } from '@/types/invoice';

export interface InvoiceInfoProps {
  data: Invoice;
}

export const InvoiceInfo = ({ data }: InvoiceInfoProps) => {
  return (
    <>
      <h3 className="mb-2 font-semibold">Invoice Information:</h3>
      <p>Date Issued: {data.dateIssued}</p>
      <p>Due Date: {data.dueDate}</p>
      <p>Status: {data.status}</p>
      <p>Total Amount: ${data.amount.toFixed(2)}</p>

      {data.status === 'Paid' && (
        <>
          <p>Payment Date: {data.paymentDate}</p>
          <p>Payment Reference: {data.paymentReference}</p>
        </>
      )}
    </>
  );
};
