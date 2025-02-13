'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Download, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Mock data for invoices
const invoicesData = [
  {
    id: 'INV001',
    number: 'INV-2023-001',
    dateIssued: '2023-06-01',
    dueDate: '2023-06-15',
    amount: 1299.99,
    status: 'Unpaid',
    items: [
      { sku: 'SKU001', name: 'T-Shirt', quantity: 50, price: 19.99 },
      { sku: 'SKU002', name: 'Jeans', quantity: 30, price: 49.99 },
    ],
  },
  {
    id: 'INV002',
    number: 'INV-2023-002',
    dateIssued: '2023-06-05',
    dueDate: '2023-06-19',
    amount: 799.5,
    status: 'Pending Confirmation',
    items: [{ sku: 'SKU003', name: 'Sneakers', quantity: 20, price: 79.95 }],
    paymentProof: 'payment_proof_INV002.pdf',
  },
  {
    id: 'INV003',
    number: 'INV-2023-003',
    dateIssued: '2023-05-20',
    dueDate: '2023-06-03',
    amount: 2499.75,
    status: 'Paid',
    items: [
      { sku: 'SKU004', name: 'Hat', quantity: 100, price: 24.99 },
      { sku: 'SKU005', name: 'Socks', quantity: 200, price: 9.99 },
    ],
    paymentDate: '2023-06-01',
    paymentReference: 'REF123456',
  },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [filter, setFilter] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [status, setStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoicesData)[0] | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter = invoice.number.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = status === 'all' || invoice.status === status;
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      (new Date(invoice.dateIssued) >= dateRange.from &&
        new Date(invoice.dateIssued) <= dateRange.to);
    return matchesFilter && matchesStatus && matchesDateRange;
  });

  const handleUploadProof = (invoiceId: string) => {
    // In a real application, you would handle file upload here
    console.log(`Uploading proof for invoice ${invoiceId}`);
    toast({
      title: 'Proof Uploaded',
      description: 'Your payment proof has been uploaded and is pending verification.',
    });
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: 'Pending Confirmation' } : inv,
      ),
    );
  };

  const isInvoiceNearingDueDate = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays > 0;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Billing & Invoices</h1>

      <div className="flex flex-wrap gap-4">
        <Input
          placeholder="Search by Invoice Number"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !dateRange && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
            <SelectItem value="Pending Confirmation">Pending Confirmation</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Date Issued</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow
              key={invoice.id}
              className={
                isInvoiceNearingDueDate(invoice.dueDate) && invoice.status === 'Unpaid'
                  ? 'bg-red-100'
                  : ''
              }
            >
              <TableCell>{invoice.number}</TableCell>
              <TableCell>{invoice.dateIssued}</TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>${invoice.amount.toFixed(2)}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Invoice Details: {invoice.number}</DialogTitle>
                        <DialogDescription>
                          View detailed information about this invoice.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <h3 className="mb-2 font-semibold">Invoice Information:</h3>
                        <p>Date Issued: {invoice.dateIssued}</p>
                        <p>Due Date: {invoice.dueDate}</p>
                        <p>Status: {invoice.status}</p>
                        <p>Total Amount: ${invoice.amount.toFixed(2)}</p>

                        {invoice.status === 'Paid' && (
                          <>
                            <p>Payment Date: {invoice.paymentDate}</p>
                            <p>Payment Reference: {invoice.paymentReference}</p>
                          </>
                        )}

                        <h3 className="mb-2 mt-4 font-semibold">Line Items:</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>SKU</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {invoice.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.sku}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                        <div className="mt-4 flex justify-between">
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          {invoice.status === 'Unpaid' && (
                            <Button onClick={() => handleUploadProof(invoice.id)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Payment Proof
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
