import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Invoice } from '@/types/invoice';
import { PropsWithChildren, useCallback } from 'react';

export interface InvoiceDialogProps {
  data: Invoice;
  setSelectedInvoice: (invoice: Invoice) => void;
}

export const InvoiceDialog = ({
  data,
  setSelectedInvoice,
  children,
}: PropsWithChildren<InvoiceDialogProps>) => {
  const handleSetSelectedInvoice = useCallback(() => setSelectedInvoice(data), []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={handleSetSelectedInvoice}>
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Invoice Details: {data.number}</DialogTitle>
          <DialogDescription>View detailed information about this invoice.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
