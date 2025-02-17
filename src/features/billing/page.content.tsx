'use client';

import { BillingAndInvoicesTable } from '@/features/billing/_components/billing-and-invoices-table';
import { Actions } from '@/features/billing/_components/actions';
import { useBilling } from '@/features/billing/_hooks/use-billing';

export default function BillingPageContent() {
  const {
    filter,
    setFilter,
    dateRange,
    setDateRange,
    status,
    setStatus,
    setSelectedInvoice,
    filteredInvoices,
    handleUploadProof,
    isInvoiceNearingDueDate,
  } = useBilling();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Billing & Invoices</h1>

      <Actions
        filter={filter}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        status={status}
        setStatus={setStatus}
      />

      <BillingAndInvoicesTable
        data={filteredInvoices}
        getIsInvoiceNearingDueDate={isInvoiceNearingDueDate}
        onUploadProof={handleUploadProof}
        setSelectedInvoice={setSelectedInvoice}
      />
    </div>
  );
}
