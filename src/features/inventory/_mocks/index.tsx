import { Inventory } from '@/types/inventory';

export const INVENTORY_DATA: Inventory[] = [
  {
    id: 1,
    sku: 'SKU001',
    name: 'T-Shirt',
    image: '/placeholder.svg',
    warehouse: 'China',
    stock: 100,
    threshold: 20,
    runoutDays: 30,
  },
  {
    id: 2,
    sku: 'SKU002',
    name: 'Jeans',
    image: '/placeholder.svg',
    warehouse: 'EU',
    stock: 50,
    threshold: 10,
    runoutDays: 15,
  },
  {
    id: 3,
    sku: 'SKU003',
    name: 'Sneakers',
    image: '/placeholder.svg',
    warehouse: 'US',
    stock: 75,
    threshold: 15,
    runoutDays: 45,
  },
  {
    id: 4,
    sku: 'SKU004',
    name: 'Hat',
    image: '/placeholder.svg',
    warehouse: 'China',
    stock: 200,
    threshold: 30,
    runoutDays: 60,
  },
  {
    id: 5,
    sku: 'SKU005',
    name: 'Socks',
    image: '/placeholder.svg',
    warehouse: 'EU',
    stock: 150,
    threshold: 25,
    runoutDays: 90,
  },
];

export const WAREHOUSE_SELECT_OPTIONS = [
  { value: 'All', label: 'All Warehouses' },
  { value: 'China', label: 'China' },
  { value: 'EU', label: 'EU' },
  { value: 'US', label: 'US' },
];

export const CATEGORY_SELECT_OPTIONS = [
  { value: 'All', label: 'All Categories' },
  { value: 'SKU0', label: 'Category 1' },
  { value: 'SKU1', label: 'Category 2' },
  { value: 'SKU2', label: 'Category 3' },
];
