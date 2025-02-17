import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { Invoice } from '@/types/invoice';
import { useCallback } from 'react';

export interface InvoiceActionsProps {
  data: Invoice;
  onUploadProof: (invoice: Invoice) => void;
}

export const InvoiceActions = ({ data, onUploadProof }: InvoiceActionsProps) => {
  const handleUploadProof = useCallback(() => onUploadProof(data), []);

  return (
    <div className="mt-4 flex justify-between">
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      {data.status === 'Unpaid' && (
        <Button onClick={handleUploadProof}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Payment Proof
        </Button>
      )}
    </div>
  );
};
