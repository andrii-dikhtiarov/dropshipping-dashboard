export interface InvoiceItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  number: string;
  dateIssued: string;
  dueDate: string;
  amount: number;
  status: string;
  items: InvoiceItem[];
  paymentProof?: string;
  paymentDate?: string;
  paymentReference?: string;
}
