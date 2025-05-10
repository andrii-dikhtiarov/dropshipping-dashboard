import { Invoice } from '@/types/invoice';

export const INVOICES_DATA: Invoice[] = [
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

export const STATUS_SELECT_OPTIONS = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Pending Confirmation', label: 'Pending Confirmation' },
  { value: 'Paid', label: 'Paid' },
];
