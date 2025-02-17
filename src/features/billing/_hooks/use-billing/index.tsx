import { useState } from 'react';
import { INVOICES_DATA } from '@/features/billing/_mocks';
import { DateRange } from 'react-day-picker';
import { Invoice } from '@/types/invoice';
import { toast } from '@/components/ui/use-toast';

export const useBilling = () => {
  const [invoices, setInvoices] = useState(INVOICES_DATA);
  const [filter, setFilter] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [status, setStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof INVOICES_DATA)[0] | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter = invoice.number.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = status === 'all' || invoice.status === status;
    const matchesDateRange =
      !dateRange?.from ||
      !dateRange?.to ||
      (new Date(invoice.dateIssued) >= dateRange.from &&
        new Date(invoice.dateIssued) <= dateRange.to);
    return matchesFilter && matchesStatus && matchesDateRange;
  });

  const handleUploadProof = (invoice: Invoice) => {
    // In a real application, you would handle file upload here
    console.log(`Uploading proof for invoice ${invoice.id}`);
    toast({
      title: 'Proof Uploaded',
      description: 'Your payment proof has been uploaded and is pending verification.',
    });
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoice.id ? { ...inv, status: 'Pending Confirmation' } : inv,
      ),
    );
  };

  const isInvoiceNearingDueDate = (invoice: Invoice) => {
    const today = new Date();
    const due = new Date(invoice.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  return {
    invoices,
    setInvoices,
    filter,
    setFilter,
    dateRange,
    setDateRange,
    status,
    setStatus,
    selectedInvoice,
    setSelectedInvoice,
    filteredInvoices,
    handleUploadProof,
    isInvoiceNearingDueDate,
  };
};
